const express = require("express");
const app = express();
// const erorrHandeler = require("./Middleware/errorhandeler");
require("./database.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, authtoken"
    );
    next();
});
const PostRoute = require("./Routes/post");
app.use("/", PostRoute);
const UserRoute = require("./Routes/user");
app.use("/", UserRoute);
// app.use(erorrHandeler);
// app.get("/", (req, res) => {
//     res.send("We Are On Home");
// });

app.listen(5000, (req, res) => {
    console.log("Listening From Port 5000...");
});
