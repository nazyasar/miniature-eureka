const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

//routes
const routes = require("./routes");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(routes);

app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);
