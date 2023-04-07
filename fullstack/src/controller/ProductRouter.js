let express = require('express');
let productRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;

function router(menu){
    productRouter.route('/')
        .get((req,res) => {
            mongodb.connect(url,function(err,dc){
                if(err){
                   res.status(500).send('Error While connecting')
                }else{
                   let dbObj = dc.db('aprnode');
                   dbObj.collection('products').find().toArray(function(err,results){
                       if(err){
                           res.status(203).send('Error While Fetching')
                       }else{
                        res.render('products',{title:'Products Page',data:results,menu})
                       }
                   })
                }
               })  
        
    })

    productRouter.route('/category/:id')
        .get(function(req,res){
            //let id = req.params.id
            let {id} = req.params;
            mongodb.connect(url,function(err,dc){
                let dbObj = dc.db('aprnode');
                   dbObj.collection('products').find({category_id:Number(id)}).toArray(function(err,results){
                   res.render('products',{title:'Products Page',data:results,menu})
                })
            }) 
        })

    productRouter.route('/details')
        .get((req,res) => {
        res.send('Product Details')
    })

    return productRouter
}

module.exports = router