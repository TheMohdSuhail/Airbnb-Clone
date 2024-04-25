const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async (req,res)=>{
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
 
    await newReview.save();
     await listing.save();
 
    //  console.log("new review saved");
     req.flash("success","New Review Created");
     res.redirect(`/listings/${listing._id}`);
 };

 module.exports.destroyReview = async(req,res,)=>{
    let { reviewId } = req.params;
    let { id } = req.params; // Accessing the parent parameter

    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findOneAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};