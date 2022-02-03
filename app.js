var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
require("dotenv").config;
require("./passport-setup");
const bcrypt = require("bcrypt");


// const routes = require("./routes");

const port = 3300;
let db = null;

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);
db = mysql.createConnection({
  host: "localhost",
  user: "nitin",
  password: "nitin",
  database: "mydb",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // db.query("CREATE DATABASE mydb", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});

// app.set("port",process.env.port//80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.get("/signup", function (req, res) {
  res.render("home/signup");
});

app.post("/signup", async (req, res) => {
  const { email, username, name, password, repassword } = req.body;
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
  const dbUser = await db.query(selectUserQuery);
  console.log(dbUser.values);
  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(hashedPassword);
  if (dbUser.values === undefined) {
    const createUserQuery = `
          INSERT INTO 
            user (email, username, name, password) 
          VALUES
            (
              '${email}',
              '${username}',
              '${name}',
              '${password}'
            )`;
    const dbResponse = await db.query(createUserQuery);
    // const newUserId = dbResponse.lastID;
    res.send("user is created");
  } else {
    res.status = 400;
    res.send("User already exists");
  }
});

app.get("/login/", function (req, res) {
  res.render("home/login");
});

app.post('/login/', async function(req, res, next) {
       
  var email = req.body.email;
  var password = req.body.password;

  let user = db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password])
  console.log(user.values)
  if(user.values === undefined) {
    res.send("Inavlid User");
  }
  else {
      res.send("Login Success")
  }

})
   
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
