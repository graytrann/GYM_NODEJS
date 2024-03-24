import express from "express";
import mysql from "mysql2";
import cors from "cors";
import rootRoute from "./routes/rootRoute.js";

const app = express();
app.listen(8080);
app.use(cors());
// chuyển tất cả sang định dạng json
app.use(express.json());

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: "3307",
  database: "gym",
});

app.use(rootRoute);
