//importing the required modules
const express = require("express");
const router = express.Router();
//import the controllers
//categories controller import
const {
     getCategories,
     createCategory ,
     getCategoryDetails,
     updateCategory
  }=require("../controllers/Category.js") 

//sucategory controller import
const {createSubcategory, getSubcategories, 
  // updateSubcategory, 
  // deleteSubcategory
}=require("../controllers/subCategory") 


/********category routes********* */
router.post("/createCategory",createCategory);
router.get("/showAllCategories", getCategories);
router.get("/categorydetails/:categoryId", getCategoryDetails);
router.put("/updateCategory/:id",updateCategory)

//*********subcategory routes ***********/
router.post("/createSubCategory", createSubcategory);
router.get("/getsubcategory", getSubcategories);
// router.put('/updateSubcategory/:id', updateSubcategory);
// router.delete('/updateSubcategory/:id', deleteSubcategory);
module.exports = router;