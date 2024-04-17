const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {validateReview} = require("../middleware.js");


// Reviews
// Post Route
router.post("/",validateReview,wrapAsync( async (req,res)=>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review);
 
    listing.reviews.push(newReview);
 
    await newReview.save();
     await listing.save();
 
     console.log("new review saved");
     req.flash("success","New Review Created");
     res.redirect(`/listings/${listing._id}`);
 }));
 
 // Delete Review Route
 router.delete("/:reviewId", wrapAsync(async(req,res,)=>{
    let { reviewId } = req.params;
    let { id } = req.params; // Accessing the parent parameter

    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findOneAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;