import express from "express";
import cors from 'cors' ;
import mongoose from 'mongoose' ;
import {userRouter} from "../server/routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());



mongoose.connect("mongodb+srv://harshaddeshmukh654:test123@recepiiie.c2ytclu.mongodb.net/recepiiie?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log(`DB connected`); 
}).catch((err) =>  
console.log(`DB connection failed ${err}`)); 

app.use("/auth", userRouter);

app.listen(3001, () => console.log("SERVER STARED!"));