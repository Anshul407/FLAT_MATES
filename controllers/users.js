const Listing=require('../models/listing.js')
const Review=require('../models/review.js')
const User=require('../models/user.js')
module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.renderLogInForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.postSignUpData=async(req,res,next)=>{
    try{
    const {username,email,password}=req.body;
    let newUser=new User({email,username})
    await User.register(newUser,password);
    req.login(newUser,(err)=>{
              if(err){
                return next(err);
              }
              req.flash("success","Welcome to Flatmates")
    res.redirect("/listings")
    })
    
}catch(e){
     req.flash("error",e.message);
     res.redirect("/signup")
}



}

module.exports.logoutlogic=(req,res,next)=>{
    req.logOut((err)=>{
        if(err) next(err);

        req.flash("success","Logout Sucessfully")
        res.redirect("/listings");
    })
}

module.exports.loginlogic=async(req,res)=>{
    req.flash("success","Login Successful");
    let redirectPath=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectPath);

}