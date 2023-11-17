const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 1234;

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.qthn2pl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    const todoCollection = client.db('Todo-App').collection('Todo');
    const InProgressCollection = client.db('Todo-App').collection('InProgress');
    const doneCollection = client.db('Todo-App').collection('Done');
/*********get api*********/ 
app.get('/todo', async(req,res)=>{
    const cursor = todoCollection.find();
    const result = await cursor.toArray();
    res.send(result)
})
app.get('/inprogress', async(req,res)=>{
    const cursor = InProgressCollection.find();
    const result = await cursor.toArray();
    res.send(result)
})
app.get('/done', async(req,res)=>{
    const cursor = doneCollection.find();
    const result = await cursor.toArray();
    res.send(result)
})

/********post api*********/ 


/*********delete api*******/ 
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', function(req,res) {
    res.send('server is running')
});

app.listen(port, ()=>{
    console.log(`the is school server is running on port: ${port}`)
})