const express = require('express')
const app = express()
const PORT = 5000
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


app.use(cors())
app.use(bodyParser.json())
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mx72a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
client.connect(err => {
  const taskCollection = client.db(process.env.DB_NAME).collection("volunteer-tasks")
  const userCollection = client.db(process.env.DB_NAME).collection("user-tasks")

    app.get("/allTasks",(req,res) => {
      taskCollection.find({})
      .toArray((err,documnets)=>res.send(documnets))
    })

    app.post("/addEvent",(req,res)=>{
      taskCollection.insertOne(req.body)
      .then(result=>res.send(result))
    })

    app.get("/singleTask",(req,res) => {
      taskCollection.find({_id:ObjectId(req.query.id)})
      .toArray((err,documnet)=>res.send(documnet[0]))
    })

    app.post("/userTask",(req,res)=>{
      userCollection.insertOne(req.body)
      .then(result=>res.send(result))
    })

    app.get("/getUserTask",(req,res) => {
      userCollection.find({email:req.query.email})
      .toArray((err,documnets)=>res.send(documnets))
    })

    app.delete("/deleteTask/:id",(req,res)=>{
       userCollection.deleteOne({_id:req.params.id})
      .then(result=>res.send(result))
    })

    app.get("/allUser",(req,res) => {
      userCollection.find({})
      .toArray((err,documnets)=>res.send(documnets))
    })


})


app.get('/',(req,res)=>res.send("Welcome Developer Nazmul"))

app.listen(process.env.PORT || PORT)


