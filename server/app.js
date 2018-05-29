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


app.post('/add', (req, res, )=>{
    let title = req.body.title;
    let author = req.body.author;
    let genre = req.body.genre;
    let pages = req.body.pages;
    // let buyurl = req.body.buyurl;
    let Obj = new Book({
        title:title,
        author:author,
        genre:genre,
        pages:pages,
        // buyurl:buyurl
    });
    Obj.save((err, reply)=>{
        if(err){
            console.log(err);
        }else{
            console.log(reply);
        }
    })
    res.send('Okay')
})

app.get('/:id', (req, res)=>{
    id = req.params.id;
    Book.findById(id, (err, book)=>{
        if(err){
            console.log(err);
        }else{
            res.json(book);
        }
    })
})

app.put('/book/:id', (req, res)=>{
    id = req.params.id;
    book = {
        genre: req.body.genre,
        author:req.body.author,
        pages:req.body.pages,
        title:req.body.title
    }
    Book.findByIdAndUpdate(id, book, (err, book)=>{
        if(err){
            console.log(err);
        }else{
            res.json(book)
            
        }
    })
})

app.delete('/book/delete/:id', (req, res)=>{
    id = req.params.id;
    book = {
        genre: req.body.genre,
        author:req.body.author,
        pages:req.body.pages,
        title:req.body.title
    }
    Book.findByIdAndRemove(id, book ,(err, book)=>{
        if(err){
            console.log(err)
        }else{
            res.json(book);
        }
    })
})


// app.put('book/:id', (req, res) => {
// 	var id = req.params.id;
// 	var book = req.body;
// 	Book.updateBook(id, book, {}, (err, book) => {
// 		if(err){
// 			throw err;
// 		}
// 		res.json(book);
// 	});
// });

// app.get('/book/:id', (req, res)=>{
//     id = req.params.id;
//     Book.findById(id, (err, book)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.json(book)
            
            
//         }
//     })
// })

app.listen(3000, ()=>{
    console.log("Server running on port 3000....")
})

