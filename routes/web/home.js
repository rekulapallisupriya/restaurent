var express = require("express");
const passport = require("passport");

var router = express.Router();


router.get("/", function(req, res) {
    // console.log("hello I'm on the start page");
 res.render("home/");
 });
 
 router.get("/home", function(req,res){
     res.render("home/home");
 });

 router.get("/about", function(req, res){
    res.render("home/about");
 });

router.get("/login/", function(req, res){
    res.render("home/login")
 });
router.get("/login", function(req, res){
    res.render("home/login")
});



const credential = {
    email: "nitingoswami1900@gmail.com",
    password: "shayna"
}

// router.post("/login/", (req, res)=>{
//     // const {email, password} = req.body
//     console.log(req)

//     if (req.body.email == credential.email && req.body.password == credential.password){
//         req.session.user = req.body.email
//         // res.redirect('/')
//         res.end('login success')
//     }else{
//         res.end('invalid username and password')
//     }
//  });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);


 module.exports = router;