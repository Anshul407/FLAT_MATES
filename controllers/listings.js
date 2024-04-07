const Listing=require('../models/listing.js')
module.exports.index=async (req, res) => {
    const listings = await Listing.find({});
    res.render("home.ejs", { listings });
}
module.exports.renderNewForm=(req, res) => {
    res.render("new.ejs")
}

module.exports.showDetailListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author"
    }}).populate("owner");
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings")
    }
    res.render("show.ejs", { listing })
}

module.exports.editListing=async (req, res) => {
    const { id } = req.params;
   
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings")
        req.flash("error","Permission Denied");
       
    }
    if(listing.owner._id.equals(req.user._id)){
    res.render("edit.ejs", { listing });}
    else{
        req.flash("error","Permission Denied");
        res.redirect(`/listings/${id}`)
    }
   
        
    
}

module.exports.postListing=async (req, res,next) => {
    if(!req.body.listing){
        throw new ExpressError(400,"Bad Request");
    }
    let url=req.file.path;
    let filename=req.file.filename
        const newListing = new Listing(req.body.listing);
        //saving the owner details using req.user method
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        await newListing.save({ runValidators: true });
        //creating flash success message
        req.flash("success","New Listing Added");
        res.redirect("/listings");
    
        // Handle validation errors
    
}

module.exports.deleteListing=async(req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error","Permission Denied");
        res.redirect(`/listings/${id}`)
    }
    await Listing.findByIdAndDelete(id);
     //creating flash success message
    req.flash("success","Listing deleted");
    res.redirect("/listings");
}
module.exports.searchListing=async (req, res) => {
   
    const { location } = req.body;
    const regex = new RegExp(location, 'i'); // 'i' flag for case-insensitive search

    const listings = await Listing.find({ location: regex });
    console.log(listings.length)
    if(listings.length===0){
        req.flash("error","No destination found");
        res.redirect('/listings')
    }
    res.render("home.ejs",{listings});

    

}
module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Bad Request");
    }

let url=req.file.path;
let filename=req.file.filename;
let listing =await Listing.findByIdAndUpdate(id, { ...req.body.listing });
if(typeof req.file!=='undefined'){
    listing.image={url,filename};
    await listing.save()}
    //creating flash success message
    req.flash("success","Listing updated")
    res.redirect("/listings")
}
