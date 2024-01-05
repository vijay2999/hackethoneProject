
const categoryModel = require('../Models/CategoryModel')

const createCategory = async function (req, res){
    try {
         let data = req.body
         //let files = req.files
         let {name,discription,status} = data
        
         const data_to_create = {name,discription,status,}
 
         const category = await categoryModel.create(data_to_create);
         return res.status(201).send({ status: true,message:"Success", data:category })
 
     } catch (error) {res.status(500).send({ status: false, message: error.message })}
     }

     




   
     module.exports={createCategory}