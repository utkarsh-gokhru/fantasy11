import express from 'express';
import { TeamModel } from '../models/teams.js';
import { calculateBatterPoints, calculateBowlerPoints, get_sc } from '../points.js';
import mongoose from 'mongoose';
import { PlayerData } from '../models/leaderboard_mod.js';
import { UserData } from '../models/leaderboard_mod.js';

const router = express.Router();

router.get('/leaderboard', async (req, res) => {
    try {
        const { matchData } = req.query;

        const matchId = matchData.matchId;
        const contestId = matchData.contestId;

        const usersWithPlayers = await TeamModel.find({ matchId, contestId }, 'username players captain vice_captain');

        const finalPlayersWithPoints = await get_sc(matchId);

        const usersWithPlayerPoints = usersWithPlayers.map(user => {
          const playerPoints = user.players.map(player => {
              const playerName = player.name;
              const isCaptain = playerName === user.captain;
              const isViceCaptain = playerName === user.vice_captain;
              const playerPointsData = finalPlayersWithPoints.find(p => p.name === playerName);

              let points = playerPointsData ? playerPointsData.points : 0;

              if (isCaptain) {
                  points *= 2; 
              } else if (isViceCaptain) {
                  points *= 1.5; 
              }

              return {
                  ...player,
                  points
              };
          });

          return {
              username: user.username,
              players: playerPoints
          };
      });

        const usernamePointsMap = {};

        usersWithPlayerPoints.forEach(user => {
            const totalPoints = user.players.reduce((total, player) => total + player.points, 0);
            usernamePointsMap[user.username] = totalPoints;
        });

        const sortedUserPoints = Object.entries(usernamePointsMap)
            .map(([username, totalPoints]) => ({ username, totalPoints }));

        sortedUserPoints.sort((a, b) => b.totalPoints - a.totalPoints);

        sortedUserPoints.forEach((user, index) => {
            user.rank = index + 1;
        });

        const player_data = new PlayerData({
            matchId: matchId,
            contestId: contestId,
            leaderboard: finalPlayersWithPoints
        });
          
        const user_data = new UserData({
        matchId: matchId,
        contestId: contestId,
        leaderboard: sortedUserPoints
        });

        const playerDataExists = await PlayerData.exists({ matchId, contestId });
        const userDataExists = await UserData.exists({ matchId, contestId });

        if (!playerDataExists && !userDataExists) {
            const player_data = new PlayerData({
                matchId: matchId,
                contestId: contestId,
                leaderboard: finalPlayersWithPoints
            });

            const user_data = new UserData({
                matchId: matchId,
                contestId: contestId,
                leaderboard: sortedUserPoints
            });

            await player_data.save();
            await user_data.save();
        } else {
            console.log('Data already exists for matchId and contestId:', matchId, contestId);
        }

        res.status(200).json({sortedUserPoints,finalPlayersWithPoints});
    } catch (error) {
        console.error('Error fetching users with players:', error);
        res.status(500).json({ error: 'Failed to fetch users with players. Please try again later.' });
    }
    
});

export { router as LeaderboardRouter };
