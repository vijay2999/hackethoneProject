


const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
//const auth= require('../Middleware/auth')
//const validator= require("../Middleware/validations")
const jwt= require("jsonwebtoken")
//const aws = require('../aws')
const mongoose = require('mongoose')
//const isValid = mongoose.Types.ObjectId.isValid




const createUser = async function (req, res){
    try {
         let data = req.body
         //let files = req.files
         let {firstname,lastname,email,phone,password} = data
         
         password = await bcrypt.hash(password, 10);
 
         const data_to_create = {firstname,lastname,email,phone,password,}
 
         const user = await userModel.create(data_to_create);
         return res.status(201).send({ status: true,message:"Success", data: user})
 
     } catch (error) {res.status(500).send({ status: false, message: error.message })}
     }

const login= async function(req,res){
  try {
          const data= req.body
          if(!Object.keys(data).length){
            return res.status(400).send({status:false,message:"plese provide email and password(they are manadatory)"})}
          
          let{email,password}=data
          if(!email) return res.status(400).send({status:false,message:"Email is required"})
          if(!password) return res.status(400).send({status:false,message:"password is required"})
  
          const userData= await userModel.findOne({email})
          if(!userData){
             return res.status(404).send({status:false,message:"Please provide valid email"})
          }else{
            let validPassword= await bcrypt.compare(password,userData.password)
            if(!validPassword) return res.status(400).send({status:false,message:"Invalid Password"}) 
          }
          const token= jwt.sign({userId:userData._id},"digiflake",{expiresIn: '12hr'})
          
          const tokenData={
              userId:userData._id,
              token:token
          }
          return res.status(200).send({status:true,message: "User login successfull",data:tokenData})
             
          } catch (err) {
            return res.status(500).send({status:false,message:err.message})  
       }     
 }



 const forgetPass= async function(req,res){
  try { 
    const email= req.body.email
    if(!email) return res.status(400).send({status:false,message:"Email is required"})
    
    const userData= await userModel.findOne({email})
    if(!userData){
       return res.status(404).send({status:false,message:"Please provide valid email"})}
       






  } catch (err) {
    return res.status(500).send({status:false,message:err.message})  
}     
}
 module.exports={createUser,login}












// // Configure the mailing service
// const transporter = nodemailer.createTransport({
//   service: 'digitalFlake25.gmail.com',
//   auth: {
//     user: 'digitalFlake25.gmail.com',
//     pass: 'Pass@25'
//   }
// });

// // Configure the template engine
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// // Password reset route
// const generatePass= async function(req,res) {
//   const email = req.body.email;

//   // Generate a reset token
//   const resetToken = crypto.randomBytes(20).toString('hex');

//   // Store the reset token and associate it with the user's email
//   resetTokens.set(email, resetToken);

//   // Generate the dynamic reset link with the reset token
//   const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

//   // Compose the email
//   const mailOptions = {
//     from: 'digitalFlake25.gmail.com',
//     to: email,
//     subject: 'Password Reset',
//     template: 'password-reset',
//     context: {
//       resetLink: resetLink
//     }
//   };
//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       // Handle the error response
//     } else {
//       console.log('Email sent:', info.response);
//       // Handle the success response
//       res.send('Password reset email sent');
//     }
//   });
// };


// // Endpoint to handle the password reset form submission
// const resetPass = async function (req, res){
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
    
//     // Find the user with the given reset token
//     const user = await db.collection('users').findOne({ resetToken: token });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid reset token' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update the user's password
//     await db.collection('users').updateOne({ resetToken: token }, { $set: { password: hashedPassword } });

//     // Delete the reset token from the user document
//     await db.collection('users').updateOne({ resetToken: token }, { $unset: { resetToken: 1 } });

//     res.json({ message: 'Password reset successful' });

//     // Close the MongoDB connection
//     client.close();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };