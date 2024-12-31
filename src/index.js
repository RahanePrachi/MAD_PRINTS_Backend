
import dotenv from 'dotenv'
import app from './app.js';
import connectDB from './db/index.js'
dotenv.config({
    path:'./.env'
})

connectDB().then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR: ",error);
        throw error
    })
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running at PORT: ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed!!",error);
});


// const express =require("express");
// const app=express();

// const database=require("../config/database");
// const PORT=process.env.PORT || 4000;
// app.use(express.json());
// database.connect();
// app.get("/", (req, res)=>{
//     return res.json({
//         success:true,
//         message:"Your server is running ..."
//     })
// })

// app.listen(PORT , ()=>{
//     console.log(`app is running at ${PORT}`);
// })
