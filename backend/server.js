const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5400;
console.log(process.env.NODE_ENV, "env+env", process.env.PORT);
app.get("/", (req, res) => res.send("server is ready"));
app.listen(port, () => console.log(`it is going hard on the port:${port}`));
