const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
const port = 9870;

//static file path
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/profile',(req,res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        let oldpath = files.fileName.filepath;
        let newpath = `${__dirname}/public/images/${files.fileName.originalFilename}`
        console.log('>>old path',oldpath);
        console.log('>>new path',newpath);
        fs.rename(oldpath,newpath,(err) => {
            res.send('File Uploaded')
        })
    })
})

app.listen(port,() => {
    console.log(`Listing to port ${port}`)
})