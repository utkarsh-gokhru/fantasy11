import express from "express";
import cors from 'cors' ;
import mongoose from 'mongoose' ;
import { userRouter } from "./routes/users.js";
import { team_router } from "./routes/team.js";
import { LeaderboardRouter } from "./routes/leaderboard.js";

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/Pinnacle_picks",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log(`DB connected`); 
}).catch((err) =>  
console.log(`DB connection failed${err}`));

app.use("/auth", userRouter);
app.use("/team_page",team_router);
app.use("/my_teams",LeaderboardRouter);

app.listen(3001, () => console.log("SERVER STARTED!"));