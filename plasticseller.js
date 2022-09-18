// const plasticseller =require("../Models/plasticseller");
// const mongoose= require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;


// module.exports= {
//     sellplastic
// }

// async function sellplastic(req,res){
//     try {
//         const body={
//             user_id:req.body.user_id,
//             username:req.body.username,
//             useraddress:req.body.useraddress,
//             platic_weight:req.body.plastic_weight,
//         }
//         const data=await plasticseller.create(body)
//         return res.status(200).json({meassage:"successful",data})

//     } catch (error) {
//         console.log("error:",error)
//         return res.status(400).json({message:"unsuccessful",error})
//     }
// }


const mongoose= require("mongoose");
const plasticseller = require("../Models/plasticseller");
const ObjectId = mongoose.Types.ObjectId;

module.exports ={
    sellplastic,
    datato_admin,
    update_points
}

async function sellplastic(req,res) {

    try {
        const body={
            user_id:req.body.user_id,
            username:req.body.username,
            useraddress:req.body.useraddress,
            plastic_weight:req.body.plastic_weight,
            reward_pts:req.body.reward_pts
        }
        const data=await plasticseller.create(body)
        return res.status(200).json({message:"successful",data})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"unsuccessful",error})
    }

}

async function datato_admin(req,res){
    try {
        const data=await plasticseller.findOne({

        })
        return res.status(200).json({message:"successful",data})
    } catch (error) {
        console.log("error:",error)
        return res.status(400).json({message:"unsuccessful",error})  
    }
}

async function update_points(req,res){
    try {
        const id= ObjectId(req.body.id);
        const plastic_weight= req.body.plastic_weight
        const reward_pts= req.body.reward_pts
        const changepdt = await plasticseller.updateOne(
            {
              _id:id
           },
           {
              plastic_weight:plastic_weight
           },
        {reward_pts:reward_pts+plastic_weight} 
        )
        return res.status(200).json({message:"successful",update_points})  
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"unsuccessful",error}) 
    }
}