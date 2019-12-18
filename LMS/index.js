var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');



const users = require('./routes/Users');
const assignmentRoutes = require('./routes/Assignment');

var app = express();
app.use(express.json());

var mongoose = require('mongoose');
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

app.use('/assignment',assignmentRoutes);
app.use('/users',users);

//file upload initializer
app.use(fileUpload);
app.post('./upload',(req,res) =>{
    if(req.files === null){
        return res.status(400).json({msg: 'No file Uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`,err =>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        res.json({fileName: file.name,filePath: `/uploads/${file.name}`});
    });
})

var corsOption = {
    origin: '*',
    optionSuccessStatus:200
}

app.use(cors(corsOption));

const mongoURI = 'mongodb://localhost:27017/Students';

mongoose
    .connect(mongoURI,{useNewUrlParser : true, useUnifiedTopology :  true})
    .then(()=>console.log('MongoDB Connected'))
    .catch(err => console.log(err));





app.listen(port,()=>{
    console.log("Server is listening on port " +port);
})