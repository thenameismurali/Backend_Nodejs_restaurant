const Firm = require("../models/Firm");
const Vendor =require("../models/Vendor");
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
const addFirm = async(req,res)=>{
    try{
    const {firmName, area, category , region,offer}=req.body
    const image = req.file? req.file.filename:undefined;
   
    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(404).json({message:"Vendor not found"});
    }
    const firm = new Firm ({firmName, area, category , region,offer,image,vendor:vendor._id})
   const savedFirm =  await firm.save();
   vendor.firm.push(savedFirm);
   await vendor.save()
    return res.status(200).json({message:"Firm added Successfuly"})
    }
    catch(error){
        console.error(error);
    }
    
}
const deleteFirmById = async(req,res)=>{
    try{
    const firmId = req.params.firmId;
    const deletedFirm= await Firm.findByIdAndDelete(firmId);
    if(!deletedFirm){
        return res.status(404).json({error:"internal error"});
    }
    res.status(200).json({message:"deleted success"});
    }
    catch(error){
        console.log(error);
    }
}
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}