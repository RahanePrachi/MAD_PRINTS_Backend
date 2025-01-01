//importing the required modules
import express from 'express';
const router = express.Router();

//import the controllers
//categories controller import
import {
     getCategories,
     createCategory 
  } from "../controllers/category.js";

//sucategory controller import
import {createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory} from "../controllers/subcategroy.js";


/********category routes********* */
router.post("/createCategory",createCategory);
router.get("/showAllCategories", getCategories);

//*********subcategory routes ***********/
router.post("/createSubCategory", createSubcategory);
router.get("/getsubcategory", getSubcategories);
router.put('/updateSubcategory/:id', updateSubcategory);
router.delete('/updateSubcategory/:id', deleteSubcategory);
export default router;