let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port= process.env.PORT || 6700;

//default
app.get('/',(req,res) => {
    res.send('Hii From Express')
})

app.get('/test',(req,res) => {
    res.send('Test Route')
})

app.listen(port,(err) => {
    if(err) throw err;
    else{
        console.log(`Server is running on port ${port}`)
    }
});