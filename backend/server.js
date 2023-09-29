const express = require("express");

const connectDb = require("./config/db.js");
const cors = require("cors");
const routes = require("./routes/routes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5400;
connectDb();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`it is going hard on the port:${port}`));
