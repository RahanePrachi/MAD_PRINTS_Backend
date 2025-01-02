//importing the required modules
const express = require("express");
const router = express.Router();

//import controller
const {
    createProduct,
    getProducts
  }=require("../controllers/Product") 


router.post("/createProduct",createProduct);

router.get("/getproducts",getProducts);
module.exports = router;