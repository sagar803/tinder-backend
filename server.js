import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'

// App config
const app = express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.z9pfyz1.mongodb.net/tinderdb?retryWrites=true&w=majority"

// middleware
app.use(express.json())
app.use(Cors())
mongoose.set('strictQuery', true);


// db config
mongoose.connect(connection_url , {
    useNewUrlParser: true
})


// API endpoints
app.get("/", (req, res) => (
    res.status(200).send("Tinder-clone backend server is up and running"))
);

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
});
app.get("/tinder/cards" , (req, res) => {
    Cards.find((err, data) => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port, ()=> console.log("Tinder-clone backend server is up and running"));