//importing the required modules
import express from 'express';
const router = express.Router();
import {upload} from "../middlewares/multer.middleware.js"
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
  createSubcategory, getSubcategories,
  // updateSubcategory, 
  // deleteSubcategory
} from "../controllers/subcategroy.controller.js"


/********category routes********* */
router.post("/createCategory",
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  createCategory
);
router.get("/showAllCategories", getCategories);
router.get("/categorydetails/:categoryId", getCategoryDetails);
router.put("/updateCategory/:id", updateCategory)

//*********subcategory routes ***********/
router.post("/createSubCategory", createSubcategory);
router.get("/getsubcategory", getSubcategories);
// router.put('/updateSubcategory/:id', updateSubcategory);
// router.delete('/updateSubcategory/:id', deleteSubcategory);
export default router;