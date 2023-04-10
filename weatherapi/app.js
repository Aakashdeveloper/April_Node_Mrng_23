let express = require('express');
let request = require('request');
let port = process.env.PORT || 7660;
let app = express();

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/weather',(req,res) => {
    let city = req.query.city?req.query.city:'Delhi'
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    // calling api
    request(url,(err,response) => {
        if(err) throw err;
        //res.send(response.body)
        const output = JSON.parse(response.body);
        res.render('index',{title:'Weather App',result:output})
    })
})

app.listen(port,(err) =>{
    if(err) throw err;
    console.log(`Running on port ${port}`)
})