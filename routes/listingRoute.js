const express=require('express')
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {listingSchema}=require('../schema.js')
const {isLoggedin}=require('../middleware.js');
const {storage}=require('../cloudConfig.js')
//adding multer for file upload

const multer=require('multer')
const upload=multer({storage})
//inclluding controllers
const listingController=require('../controllers/listings.js')
//creating middleware for schema validation
const listingValidation=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}
router.get("/",wrapAsync(listingController.index));
router.get("/new",isLoggedin,listingController.renderNewForm)

router.get("/:id",wrapAsync(listingController.showDetailListing))

router.get("/:id/edit",isLoggedin,wrapAsync(listingController.editListing))
router.post("/",upload.single("listing[image]"), wrapAsync(listingController.postListing));

router.post('/search', wrapAsync(listingController.searchListing));

// Use DELETE method for delete route
router.delete("/:id",isLoggedin, wrapAsync (listingController.deleteListing))

// Use PUT method for edit route
router.put("/:id",upload.single("listing[image]"),listingValidation,isLoggedin, wrapAsync(listingController.updateListing))

module.exports=router;