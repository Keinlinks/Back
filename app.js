const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require("./Routes/index"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
