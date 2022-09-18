const express = require("express");
//
//const bodyParser = require("body-parser")
//
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");

const cors = require("cors");
dotenv.config();

//CONNECTING MONGODB

mongoose
  .connect(process.env.DB_CONNECT, {})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(express.json());
//
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended:true
//}))
//
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const routes = require("./Routes/apiRoutes")
app.use("/",routes);

// app.post("/login",(req,res)=>{

// })

// //
// app.get("/",(req,res)=>{

//   res.set({
//     "ALLow-access-ALLow-Origin": '*'
//   })

// })
// //
app.listen(PORT, () => {
    console.log("server started and running on port 3001");
  });