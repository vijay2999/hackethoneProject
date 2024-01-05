const express = require('express');
const router = express.Router();
const UserController = require("../Controllers/UserController");
const CategoryController = require("../Controllers/CategoryController");
const ProductController = require("../Controllers/ProductController");
const MW = require("../middlewere/auth");


router.post('/users',UserController.createUser);
router.post("/login", UserController.login);
router.post('/category',CategoryController.createCategory);
router.post('/Products',ProductController.createproduct)
router.get('/getProduct/:Category',ProductController.getProductsByCategory)
router.get('/getProduct',ProductController.getProduct)
router.delete("/Products/:productId", MW.authenticate,ProductController.deleteProduct);
router.delete("/deleteProducts", ProductController.deleteCategory);
router.get('/getProduct',ProductController.getProductsByName)
//router.post('/register',createuser,createUser)

module.exports = router;




