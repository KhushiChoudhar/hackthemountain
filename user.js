const user = require("../Models/user")
module.exports = {
    register,
    GetData,
    UpdateData,
    DeleteData,
    login,
}

async function register(req,res){
    try {
        const body ={
            name:req.body.name,
            email:req.body.email,
            phoneno:req.body.phoneno,
            password:req.body.password,
            address:req.body.address
        }
        const data= await user.create(body)
        return res.status(200).json({message:"succesful",data})
    } catch (error) {
        return res.status(400).json({message:"unsuccesful",data})   
    }
}
async function GetData(req , res){
    try {
        const body = await user.find({
            // where : {OrgId : req.params.id}    //to find the data of a particular id
        })
        console.log("data read : " , body)
        return res.status(200).json({message:"succesful"})
    } catch (error) {
        return res.status(400).json({message:"unsuccesful"})   
    }
       
}
async function UpdateData(req,res){
    const id= ObjectId(req.body.id);
    const email= req.body.email;
    try {
        const update = await user.updateOne(
            {
                _id:id
        
            },
            {email: email}
        )
        return res.status(200).json({message:"successful",update})
    } catch (error) {
        return res.status(400).json({message:"unsuccessful"},error) 
    }
}

async function DeleteData(req,res){
    const id= ObjectId(req.body.id);
       try {
        const update = await user.deleteOne(
            {
                _id:id
        
            }
            
        )
        return res.status(200).json({message:"successful"})
    } catch (error) {
        return res.status(400).json({message:"unsuccessful"},error) 
    }
}
async function login(req,res){
    try {
        const {email,password}=req.body;
        const userdata = await user.findOne({email:email})
        console.log(userdata)
        if(!userdata){
            return res.status(400).json({message:"user not found.register"})   
        }
        if(userdata.password==password){

            return res.status(200).json({message:"user found",userdata})   
        }
        console.log("body.password",password)
        console.log("userpassword",userdata.password)
        return res.status(400).json({message:"password wrong"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Something Wrong",error}) 
    }
}