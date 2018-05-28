const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(bodyParser.json())
app.use(cors());
mongoose.connect('mongodb://localhost/bookstore');
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Connected with MongoDB');
});
db.on('error', ()=>{
    console.log('error');
});

let Book = require('./models/book');

app.get('/', (req, res)=>{
    Book.find({}, (err, books)=>{
        if(err){
            console.log(err);
        }else{
            res.json({books})

        }
    })
  
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000....")
})

