const express =require("express");
const app=express();
const cookieParser=require("cookie-parser")
const dotenv= require("dotenv")
const {cloudinaryConnect}=require('./config/cloudinary');
const fileUpload=require('express-fileupload');
dotenv.config();
const categoryRoutes=require("./routes/category");
const database=require("./config/database");
const PORT=process.env.PORT || 4000;
app.use(express.json());
//db connect
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

app.use("/api/v1/category", categoryRoutes);


app.get("/", (req, res)=>{
    return res.json({
        success:true,
        message:"Your server is running  on port 5000..."
    })
})

app.listen(PORT , ()=>{
    console.log(`app is running at ${PORT}`);
})