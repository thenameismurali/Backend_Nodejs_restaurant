const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyparser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const app =express()
const PORT = 4000;
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connection success"))
.catch((error)=>console.log(error))
app.use(bodyparser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);

app.listen(PORT,()=>{
    console.log(`Server Started and running ar ${PORT}`);
})
app.use('/home',(req,res)=>{
   res.send("<h1>Welcome ");  
})