let fs = require('fs');

fs.writeFile('mycode.txt','We are using express',(err)=>{
    if(err) throw err;
    console.log('Task Done')
})
