const express = require('express');
const fileupload = require('express-fileupload');
//const bodyParser = require('body-parser')
const app = express();
const port = 9987;

//static file path
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');

//middleware
app.use(fileupload());
//app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.render('index');
})

app.post('/profile',(req,res) => {
    console.log(req.files);
    console.log(req.body);
    const imageFile = req.files.fileName;
    //upload image
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render('display',{title:req.body.imgName,image:imageFile.name})
    })
});

app.listen(port,() => {
    console.log('listening on port '+port)
})