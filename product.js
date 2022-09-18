const product =require("../Models/product");
const mongoose= require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");
const multer = require("multer");

module.exports = {
   pdtupload,
   GetPdt,
   UpdatePdt,
   DeletePdt,
}

async function pdtupload(req,res) {
    try {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              // Uploads is the Upload_folder_name
              cb(null, "ImgUploads");
            },
            filename: function (req, file, cb) {
              cb(null, file.fieldname + "-" + Date.now() + ".jpg");
            },
          });
      
          const maxSize = 5 * 2000 * 2000;
      
          var upload = multer({
            storage: storage,
            limits: { fileSize: maxSize },
            fileFilter: function (req, file, cb) {
              // Set the filetypes, it is optional
              var filetypes = /jpeg|jpg|png/;
              var mimetype = filetypes.test(file.mimetype);
      
              var extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
              );
      
              if (mimetype && extname) {
                return cb(null, true);
              }
      
              cb(
                "Error: File upload only supports the " +
                  "following filetypes - " +
                  filetypes
              );
            },
      
            // mypic is the name of file attribute
          }).single("image");
          upload(req, res, async function (err) {
            if (err) {
              // ERROR occurred (here it can be occurred due
              // to uploading image of size greater than
              // 1MB or uploading different file type)
              return res.send(err);
            } else {
              // productsData.update({ imageId: req.file.filename }, { where: { id: 2 } });
              
        const body ={
            artisan_id:req.body.artisan_id,
            pdtname:req.body.pdtname,
            pdtprice:req.body.pdtprice,
            pdtdesc:req.body.pdtdesc,
            pdt_id:req.file.filename,
            pdtstock:req.body.pdtstock,
        }
        const data = await product.create(body)
        return res.status(200).json({message:"successful",data})
    }});
    }catch (error) {
        console.log("error:",error)
        return res.status(400).json({message:"unsuccessful",error})  
    }
}

async function GetPdt(req,res){
    try {
        const data=await product.find({

        })
        return res.status(200).json({message:"successful",data})
    } catch (error) {
     console.log("error:",error)
     return res.status(400).json({message:"unsuccessful",error})   
    }
}

async function UpdatePdt(req,res){
    const id= ObjectId(req.body.id);
    const price= req.body.price;
    try {
       const changepdt = await product.updateOne(
        {
          _id:id
       },
       {price:price}
       )
       return res.status(200).json({message:"successful",changepdt})
    } catch (error) {
        console.log("error:",error)
        return res.status(400).json({message:"unsuccessful",error})  
    }
}

async function DeletePdt(req,res){
    const id= ObjectId(req.body.id);
    try {
        const removepdt = await product.deleteOne(
             {
                _id:id
             } 
        ) 
        return res.status(200).json({message:"successful"})
    } catch (error) {
        return res.status(400).json({message:"unsuccessful"},error)  
    }
}