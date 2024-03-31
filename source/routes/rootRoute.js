import express from "express";
import userRoute from "./userRoute.js";
import courseRoot from "./courseRoute.js";

const rootRoute = express.Router();

rootRoute.use("/user", userRoute);
rootRoute.use("/course",courseRoot);

export default rootRoute;
