import mongoose from 'mongoose';

// const PlayerSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
// });

const TeamSchema = new mongoose.Schema({
  username: { type: String, required: true },
  matchId: { type: Number, required: true }, 
  contestId: { type: Number, required: true }, 
  team1Name: {type: String,required: true},
  team2Name: {type: String,required: true},
  captain: {type: String,required: true},
  vice_captain: {type: String,required: true},
  players: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    }
  ],
});

// export const PlayerModel = mongoose.model('Player', PlayerSchema);
export const TeamModel = mongoose.model('Team', TeamSchema);
