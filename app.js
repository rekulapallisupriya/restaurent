var express = require("express");
var path = require("path");
var mysql = require('mysql');

//var routes = require("./routes");

var app = express();
const port=3309


var con = mysql.createConnection({
  host: "localhost",
  user: "nitin",
  password: "nitin"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
});

// app.set("port",process.env.port//80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));


app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})





