const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./config/settings');
// const passport = require('passport');
// const settings = require('./config/settings');

let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
mongoose.connect('mongodb://localhost/bookstore');
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Connected with MongoDB');
});
db.on('error', ()=>{
    console.log('error');
});

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

let Book = require('./models/book');
let User = require('./models/user');

app.get('/',passport.authenticate('jwt', {session:false}), (req, res)=>{
    Book.find({}, (err, books)=>{
        if(err){
            console.log(err);
        }else{
            res.json({books})
        }
    })
  
});


app.post('/add', passport.authenticate('jwt', {session:false}),(req, res, )=>{
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

app.post('/register', (req, res, next)=>{
    let newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({success:false, msg:"Failed to register User"})
        }else{
            res.json({success:true, msg:"User registered"});
        }
    });
});

app.post('/login', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg:"User not found"})
        }
        User.comparePassword(password, user.password, (err, isMatch ) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn : 604800 // ! week
                });
                res.json({
                    success:true,
                    token : 'JWT ' + token,
                    user:{
                        id:user._id,
                        name: user.username,
                        email: user.email
                    }
                })
            }else{
                res.json({success: false, msg:'Wrong password'})
            }
        })
    }
    )
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000....")
});

