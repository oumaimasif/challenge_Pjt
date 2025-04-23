const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const {verifierToken, checkRole}= require("../auth")

router.get('/dashboard',verifierToken,checkRole(["admin"]),async(req,res)=>{
    // console.log("page Admin")
    const admin = await Admin.find()
    // console.log("adminnnn: ",admin[0].nom)+
    res.send(`Bienvenu sur le dashboard de l'admin : ${admin[0].nom}`)
})

//test 

module.exports = router;
