const express=require('express')
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const Review = require("../models/review.js")
const {reviewSchema}=require('../schema.js')
const Listing = require("../models/listing.js")
const {isLoggedin}=require('../middleware.js');
const reviewController=require('../controllers/reviews.js')
const reviewValidation=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}
router.post("/",reviewValidation,isLoggedin,wrapAsync(reviewController.postReview))

router.delete("/:rid",isLoggedin,wrapAsync(reviewController.deleteReview))

module.exports=router;