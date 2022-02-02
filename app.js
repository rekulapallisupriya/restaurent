var express = require("express");
var path = require("path");

//var routes = require("./routes");

var app = express();
const port=3309

// app.set("port",process.env.port//80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));


app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})





