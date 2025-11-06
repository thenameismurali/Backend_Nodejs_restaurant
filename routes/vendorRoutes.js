const vendorController = require('../controllers/vendorController');
const express= require ('express');
const router = express.Router();
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/get-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:apple',vendorController.getVendorbyId);



 module.exports = router;