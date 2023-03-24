let fs = require('fs');

// fs.writeFile('mycode.txt','We are using express',(err)=>{
//     if(err) throw err;
//     console.log('Task Done')
// })

// fs.appendFile('myText.txt','Code from Node FS \n',(err) => {
//     if(err) throw err;
//     console.log('File appended')
// })

// fs.readFiles('myText.txt','utf-8',(err,data)=>{
//     if(err) throw err;
//     console.log(data)
// })


// let data  = fs.readFileSync('city.json',{encoding:'utf-8',flag:'r'})
// console.log(data)

// let data1  = fs.readFileSync('myText.txt',{encoding:'utf-8',flag:'r'})
// console.log(data1)


// fs.unlink('mycode.txt',(err)=>{
//     if(err) throw err;
//     console.log('file deleted')
// })

fs.rename('myText.txt','myFile.xml',(err)=>{
    if(err) throw err;
    console.log('file renamed')
})