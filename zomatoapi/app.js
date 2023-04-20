let express = require('express');
let app = express();
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dotenv  = require('dotenv');
dotenv.config()
let mongoUrl = process.env.MongoUrl;
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let db;
let authKey = process.env.AuthKey


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

function auth(key){
    if(key == authKey){
        return true
    }else{
        return false
    }
}

function getData(colName,query){
    let output;
    db.collection(colName).find(query).toArray((err,data) => {
        if(err) throw err;
        console.log(">>>data",data)
        output = data
    })
    return output
}

// get heart beat
app.get('/',(req,res) => {
    res.status(200).send('Health ok')
})

//List of city
app.get('/location',(req,res) => {
    let key = req.header('x-basic-token')
    if(auth(key)){
        db.collection('location').find().toArray((err,data) => {
            if(err) throw err;
            res.status(200).send(data)
        })
    }else{
        res.status(401).send('Not Authenticated call')
    } 
})

//List of restaurants
app.get('/restaurants',(req,res) => {
    let query = {};
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    if(stateId && mealId){
        query = {
            state_id:stateId,
            "mealTypes.mealtype_id":mealId
        }
    }
    else if(stateId){
        query = {state_id:stateId}
    }else if(mealId){
        query={ "mealTypes.mealtype_id":mealId}
    }else{
        query = {}
    }
    db.collection('restaurants').find(query).toArray((err,data) => {
        res.status(200).send(data)
    })
})

//list of meals
app.get('/meals',async (req,res) => {
    let query = {}
    let collection = 'mealType'
    db.collection(collection).find(query).toArray((err,data) => {
        res.status(200).send(data)
    })
    // let output = await getData(collection,query)
    // console.log(">>>output",output)
    // res.send(output)
})




MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client) => {
    if(err) console.log(`Error While connecting to mongo`);
    db = client.db('internfeb');
    app.listen(port,() => {
        console.log(`Running on port ${port}`)
    })
})