import express from 'express';
import mongoose from 'mongoose';
import { TeamModel } from '../models/teams.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { selectedPlayers, matchId, contestId, captain, viceCaptain, username,team1Name,team2Name } = req.body; 

    const playersToStore = selectedPlayers.map((player) => ({
      id: player.id,
      name: player.fullName,
    }));

    const team = new TeamModel({
      _id: new mongoose.Types.ObjectId(),
      username,
      matchId, 
      contestId,
      team1Name,
      team2Name,
      captain: captain, 
      vice_captain: viceCaptain, 
      players: playersToStore,
    });

    const savedTeam = await team.save();

    res.status(201).json(savedTeam);
  } catch (error) {
    console.error('Error creating a team:', error);

    res.status(500).json({ error: 'Failed to create a team. Please try again later.' });
  }
});

router.get('/teams', async (req, res) => {
  try {

    const {username} = req.query;

    const teams = await TeamModel.find({username});

    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching all teams:', error);
    res.status(500).json({ error: 'Failed to fetch  teams. Please try again later.' });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { username, matchId, contestId, captain, viceCaptain, players } = req.body;

    const existingTeam = await TeamModel.findOne({ username, matchId, contestId });

    if (!existingTeam) {
      return res.status(404).json({ error: 'Team not found.' });
    }

    existingTeam.captain = captain;
    existingTeam.vice_captain = viceCaptain;
    existingTeam.players = players;

    const updatedTeam = await existingTeam.save();

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error('Error updating team data:', error);

    res.status(500).json({ error: 'Failed to update team data. Please try again later.' });
  }
});

export { router as team_router };
