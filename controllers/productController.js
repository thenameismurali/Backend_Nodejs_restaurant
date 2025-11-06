const Product = require("../models/Product");
const Firm =require("../models/Firm");
const multer = require("multer");
 const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: function (req, file, cb){
    cb(
      null,Date.now()+Path2D.extname(file.originalname));
  },
});
const upload = multer({
  storage:storage
});
const addProduct = async(req,res)=>{
    try{
        const{productName,price,category,bestseller,description} = req.body;
        const image = req.file? req.file.filename:undefined;
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"});
          
        }
        const product = new Product ({
            productName,price,category,bestseller,description,image,firm:firm._id
        })
        const savedProduct =await product.save();
        firm.products.push(savedProduct);
        await firm.save()
        res.status(200).json(savedProduct)
   
    }
    catch(error){
        console.log(error);
    }
}
const getProductByFirm = async(req,res)=>{
    try{
    const firmId= req.params.firmId
    const firm = await Firm.findById(firmId);
    if(!firm){
        return res.status(404).json({error:"no firm found"});
    }
    const restaurent = firm.firmName;
    const products = await Product.find({firm:firmId});
    res.status(200).json({restaurent,products});
    }
    catch(error){
        console.log(error);
    }
}
const deleteProductById = async(req,res)=>{
    try{
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
        return res.status(404).json({error:"internal error"});
    }
     res.status(200).json({message:"deleted success"});
    }
    catch(error){
        console.log(error);
    }
}
module.exports ={addProduct:[upload.single('image'),addProduct],getProductByFirm, deleteProductById};