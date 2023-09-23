const express = require("express");

const routes = require("./routes/routes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5400;
console.log(notFound);
const app = express();

app.get("/", (req, res) => res.status(200).json("server is ready"));

app.use(notFound);
app.use(errorHandler);
app.use("/user", routes);
app.listen(port, () => console.log(`it is going hard on the port:${port}`));
