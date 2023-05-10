const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

const fileName = "manali.jpeg";

const uploadFile = () => {
    fs.readFile(fileName,(err,data) => {
        if(err) throw err;
        const params = {
            Bucket:'augweb',
            Key:`${Date.now().toString()} - ${fileName}`,
            Body: JSON.stringify(data,null,2)
        };
        s3.upload(params,function(err,data){
            if(err) throw err;
            console.log(`File uploaded successfully at ${data.Location}`);
        })
    })
}

uploadFile()