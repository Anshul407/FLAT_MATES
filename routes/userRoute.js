const express=require('express')
const router=express.Router();
const User=require('../models/user.js');
const passport = require('passport');
const {saveRedirectUrl}=require('../middleware.js');
//including controller
const userController=require('../controllers/users.js')

router.get("/signup",userController.renderSignUpForm)
router.get("/login",userController.renderLogInForm)

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.loginlogic)

router.post("/signup",userController.postSignUpData)
router.get("/logout",userController.logoutlogic)
module.exports=router;