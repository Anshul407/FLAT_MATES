const Listing=require('../models/listing.js')
const Review=require('../models/review.js')
module.exports.postReview=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.reviews);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    let xx=await newReview.save();
    await listing.save();
     //creating flash success message
    req.flash("success","Review Posted");
    res.redirect(`/listings/${id}`);
}
module.exports.deleteReview=async(req,res)=>{
    let {id,rid}=req.params;
    const reviewUser=await Review.findById(rid);
    console.log(req.user._id)
    if(!reviewUser.author._id.equals(req.user._id)){
        req.flash("error","Can't be deleted");
        res.redirect(`/listings/${id}`)
    }else{
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}})
    await Review.findByIdAndDelete(rid)
     //creating flash success message
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`)}
}