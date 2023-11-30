require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
