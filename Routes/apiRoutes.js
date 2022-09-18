const router = require("express").Router();
const user = require("../controllers/user")


router.post("/register",user.register)
router.get("/GetData",user.GetData)
router.put("/UpdateData",user.UpdateData)
router.delete("/DeleteData",user.DeleteData)
router.post("/login",user.login)

module.exports=router;