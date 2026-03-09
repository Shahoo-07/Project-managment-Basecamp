import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
});

const app = express();
const port =  process.env.PORT || 3000;


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods: ["GET","PUT","DELETE","POST","PATCH","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
}))

import healthCheckRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";

app.use("/api/v1/healthcheck",healthCheckRouter);
app.use("/api/v1/auth",authRouter);

app.get('/',(req,res) =>{
    res.send("hello world");
});

connectDB()
    .then(() =>{
        app.listen( port ,()=>{
    console.log("server is running");
})
    })
    .catch((err) =>{
        console.error("MongoDB connection error",err)
        process.exit(1)
    })
