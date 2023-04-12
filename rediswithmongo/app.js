import {createClient} from 'redis';
import express from 'express';
import {MongoClient} from 'mongodb';
const app = express();
const port = process.env.PORT || 8770;
const url = "mongodb://localhost:27017";
const mClient = new MongoClient(url);
const rClient = createClient({host:'localhsot',port:6379});

// connecting redis
rClient.on('err',err=>console.log(err))

// connecting mongo
async function main(){
    await mClient.connect()
}

const collection = mClient.db('aprnode').collection('products')

app.get('/data', async(req,res) => {
    await rClient.connect()
    let uInput = req.query.color.trim();
    let result = await rClient.get(uInput)
    if(result){
        const output = JSON.parse(result);
        res.send(output)
    }else{
        // as data is not in redis get from  mongo
        const output = [];
        const cursor = collection.find({Color:uInput});
        for await (const data of cursor){
            output.push(data)
        }
        await rClient.set(uInput,JSON.stringify({source:'Redis cache',output}),{EX:10, NX:true})
        cursor.closed;
        res.send({source:'MongoDB',output})
    }
    await rClient.disconnect()
})

app.listen(port,(err) => {
    main()
    console.log(`Server is runnig on port ${port}`)
})