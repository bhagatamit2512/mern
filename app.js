require('dotenv').config();
const express=require('express');
const app=express();

const port=process.env.PORT || 8000;
const mongoose = require("mongoose");
var bodyParser = require("body-parser")
const cookieParser=require("cookie-parser");
const cors=require("cors");

const authRoutes =require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes = require("./routes/product");


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(()=>{
    console.log("DB Connected")
})

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors());


//routese

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api", productRoutes);



app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})