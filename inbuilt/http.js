let http = require('http');

//req > what we send to server(params,queryParams,body)
//res > what server sends in return 

let server = http.createServer((req,res)=>{
    res.write('<h1>This is NodeJs App Server Code</h1>');
    res.end()
})

server.listen(7600)