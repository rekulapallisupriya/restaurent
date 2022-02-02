var express = require("express");
var app = express();
var path = require("path");
var mysql = require('mysql');
const bodyparser = require("body-parser")
const session = require('express-session')
const {v4: uuidv4} = require('uuid')
const passport = require('passport')
require('dotenv').config
require('./passport-setup')

// const routes = require("./routes");

const port=3300

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "nitin",
//   password: "nitin"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // con.query("CREATE DATABASE mydb", function (err, result) {
//     //   if (err) throw err;
//     //   console.log("Database created");
//     // });
// });

// app.set("port",process.env.port//80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(passport.initialize())
app.use(passport.session())

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.post("/login/", (req, res)=>{
    // const {email, password} = req.body
    console.log(req.body)

    // if (req.body.email == credential.email && req.body.password == credential.password){
    //     req.session.user = req.body.email
    //     // res.redirect('/')
    //     res.end('login success')
    // }else{
    //     res.end('invalid username and password')
    // }
    res.send(req.body)
 });

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})





