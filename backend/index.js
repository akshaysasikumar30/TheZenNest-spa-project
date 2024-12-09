import express from "express";
//import bodyParser from "body-parser"

import userRoutes from "./routes/userRoutes.js"
const app = express();

app.use(express.json());

//app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/",(req,res)=>{
    res.send("hi");
});


app.use("/api/user",userRoutes);
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`App is running in ${PORT}`)
});