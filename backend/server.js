const express = require("express");
const app = express();
const routes = require("./routes/routes.js");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5400;
console.log(process.env.NODE_ENV, "env+env", process.env.PORT);
app.use("/", routes);
app.listen(port, () => console.log(`it is going hard on the port:${port}`));
