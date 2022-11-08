const express=require('express')
const cors=require('cors')
const app=express()
const port=process.env.PORT||5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


//midelewere

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5gquyue.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const serviceCollection=client.db('city-tours').collection('products')

        app.get('/services',async(req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query)
            const services=await cursor.toArray()
            res.send(services)
        });
    }
    finally{

    }


}
run().catch(error=>console.error(error))


app.get('/',(req,res)=>{
    res.send('Your server is running')
})


app.listen(port,()=>{
    console.log(`city tours server is running on ${port}`)
})

