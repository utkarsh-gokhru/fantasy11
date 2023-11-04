import mongoose from 'mongoose';

const playerDataSchema = new mongoose.Schema({
    matchId: Number,
    contestId: Number,
    leaderboard: [
        {
            name: String,
            points: Number,
        }
    ]
});

export const PlayerData = mongoose.model('player_lead', playerDataSchema);


const userDataSchema = new mongoose.Schema({
    matchId: Number,
    contestId: Number,
    leaderboard: [
        {
            username: String,
            totalPoints: Number,
            rank: Number,
        }
    ]
});
  
export const UserData = mongoose.model('user_lead', userDataSchema);
