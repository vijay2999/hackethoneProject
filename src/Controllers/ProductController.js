
const ProductModel = require('../Models/ProductModel')

const createproduct = async function (req, res){
    try {
        let product = req.body
        let { Name, PackegeSize, Category, MRP, status } = product;
        
        let productCreated = {Name ,PackegeSize , Category,MRP ,status}
        const productCreate = await ProductModel.create(productCreated);
        return res.status(201).send({ status: true, message: 'Success', data: productCreate });
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getProductsByCategory= async function(req,res){
    try {
        let productCategory = req.params.Category
        if (!productCategory)
            return res.status(400).send({ status: false, msg: "please give product Category" })
  
        let product = await ProductModel.find({Category: productCategory})       
        return res.status(200).send({ status: true, message: "Success", data: product })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
  }
  
const getProduct= async function(req,res){
    try {
        let productName = req.body.Name
        if (!productName)
            return res.status(400).send({ status: false, msg: "please give product Name" })
  
            let product = await ProductModel.find({ Name: productName });       
        return res.status(200).send({ status: true, message: "Success", data: product })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
  }

  const deleteProduct = async function (req, res) {

    try {
      let productId = req.params.productId
      console.log(productId)
  
      let productData = await ProductModel.findById(productId)
  
      if (!productId) {
        return res.status(404).send({ msg: "No product exists with this productId" })
      }
  
       if (productData.isDeleted === true) {
         return res.status(404).send({ msg: "Product is already deleted" })
       }
  
      let deleteProduct = await ProductModel.findOneAndUpdate({ _id: productId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
      res.status(200).send({ status: true, msg: "Product is sucessfully deleted",data:deleteProduct })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  const deleteCategory = async function (req, res) {

    try {
      let categoryName = req.body.category
      console.log(categoryName)
  
      

      let categoryData = await ProductModel.find({ Category: categoryName,isDeleted:false});

  
      if (categoryData.length===0) {
        return res.status(404).send({ msg: "No product exists with this category or get allready deleted" })
      }
     
      const updateResult = await ProductModel.updateMany(
        { $and: [{ Category: categoryName }, { isDeleted: false }] },
        { $set: { isDeleted: true } }
      );
        res.status(200).send({ status: true, msg: "Product is sucessfully deleted",data:updateResult })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }


  module.exports={createproduct,getProductsByCategory,getProduct,deleteProduct,deleteCategory,getProductsByName}
