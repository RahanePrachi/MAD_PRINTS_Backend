//importing the required modules
import express from 'express';
const router = express.Router();
import {upload} from "../middlewares/multer.middleware.js"

import {auth, isAdmin, isCustomer, isVendor} from "../middlewares/auth.middleware.js"
//import the controllers
//categories controller import
import {
  getCategories,
  createCategory,
  getCategoryDetails,
  updateCategory
} from "../controllers/category.controller.js"

//sucategory controller import
import {
  createSubcategory, getSubcategories, updateSubcategory
  
  // deleteSubcategory
} from "../controllers/subcategroy.controller.js"


/********category routes********* */
router.post("/createCategory",
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]), auth, isAdmin,
  createCategory
);
router.get("/showAllCategories", getCategories);
router.get("/categorydetails/:categoryId", getCategoryDetails);
router.put("/updateCategory/:id",upload.fields([
  {
    name: "photo",
    maxCount: 1,
  },
]), updateCategory)

//*********subcategory routes ***********/
router.post("/createSubCategory", auth, isAdmin, createSubcategory);
router.get("/getsubcategory", getSubcategories);
router.put("/updateSubCategory/:id",upload.fields([
  {
    name: "photo",
    maxCount: 1,
  },
]), updateSubcategory)

// router.delete('/deleteSubcategory/:id', deleteSubcategory);
export default router;