import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

// App config
dotenv.config();
console.log(process.env);
const app = express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://"+process.env.DBUSERNAME+":"+process.env.DBPASSWORD+"@cluster0.z9pfyz1.mongodb.net/tinderdb?retryWrites=true&w=majority"

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
    res.status(200).send("hello"))
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