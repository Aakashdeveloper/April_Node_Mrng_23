import express from 'express';
import axios from 'axios';
import {createClient} from 'redis';
let port = process.env.PORT || 7811;
let app = express();

let client = createClient({
    host:'localhost',
    port:6379
});

client.on('error',err=> console.log('Redis Client Error',err))

app.get('/data',async (req,res) => {
    await client.connect();
    let userInput = req.query.country.trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    let result = await client.get(userInput);
    if(result){
        const output = JSON.parse(result);
        res.send(output)
    }else{
        let response = await axios.get(url);
        const output = response.data;
        await client.set(userInput,JSON.stringify({source:'Redis Cache',output}),{EX:10, NX:true})
        res.send({source:'API Response',output})
    }
    await client.disconnect()
})

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})