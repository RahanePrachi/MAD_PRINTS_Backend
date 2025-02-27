import express from "express";
import cookieParser from "cookie-parser"; //crud operation on user cookies
import cors from "cors";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    // credentials:true
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json());
app.use(express.json({limit:"16kb"})); //set limit to incomming json data to avoid server crashes
app.use(express.urlencoded({extended:true,limit:"16kb"})); //encode url extended allow nested object
app.use(express.static("public"));
app.use(cookieParser());


//routes import

import productRouter from './routes/product.route.js'
import categoryRouter from "./routes/category.route.js"
import userRouter from "./routes/user.route.js"
import orderRouter from "./routes/order.route.js"
import paymentRoutes from "./routes/payment.route.js"
//route declaration
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/product",productRouter); //https://localhost:8000/api/v1/users/login or register
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRoutes)

app.get("/", (req, res)=>{
    return res.json({
        success:true,
        message:"Your server is running ..."
    })
})
export default app