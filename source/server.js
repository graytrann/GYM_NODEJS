import express from "express";
import mysql from "mysql2";
import cors from "cors";
import rootRoute from "./routes/rootRoute.js";

const app = express();
app.listen(8080);
app.use(cors());
// chuyển tất cả sang định dạng json
app.use(express.json());

app.use(rootRoute);
