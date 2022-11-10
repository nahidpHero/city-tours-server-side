const express=require('express')
const cors=require('cors')
const app=express()
const port=process.env.PORT||5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion,ObjectId} = require('mongodb');


//midelewere

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5gquyue.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const serviceCollection=client.db('city-tours').collection('products')
        const reviwesCollection=client.db('city-tours').collection('reviwes')
        

        app.get('/services',async(req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query)
            const services=await cursor.toArray()
            res.send(services)
        });

        app.post('/services',async(req,res)=>{
            const service=req.body;
            const result=await serviceCollection.insertOne(service);
            res.send(result)

        })

        app.get('/limitservices',async (req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query)
            const limitservices=await cursor.limit(3).toArray()
            res.send(limitservices)
        })

        app.get('/services/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const service=await serviceCollection.findOne(query);
            res.send(service)
           
        })
        
       
        app.get('/reviewes',async(req,res)=>{
            let query={};
            if(req.query.email){
                 query={
                    email:req.query.email
                 }
            }
             const cursor=reviwesCollection.find(query)
             const reviewes=await cursor.toArray()
             res.send(reviewes)
        })


        app.post('/reviewes',async(req,res)=>{
            const reviwe=req.body;
            const result=await reviwesCollection.insertOne(reviwe)
            res.send(result)

        })




        

        app.get('/reviewes/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const reviwes=await reviwesCollection.findOne(query);
            res.send(reviwes)

        })

        app.delete('/reviewes/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const result=await reviwesCollection.deleteOne(query)
            res.send(result)
        })

       
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

