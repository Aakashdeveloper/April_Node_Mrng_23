const express = require('express');
const port = 8600;
const app = express();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/schema');

app.use('/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql:true
    })
)

app.listen(port,()=>{
    console.log(`Listing to port ${port}`)
})