const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,isReviewAuthor,} = require("../middleware.js")
const listingController = require("../Controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get( wrapAsync(listingController.index)
)
.post(
   // validateListing,
   isLoggedIn,
   upload.single('listing[image]'),
wrapAsync(listingController.createListing)
);


//New Route

router.get("/new",isLoggedIn,listingController.renderNewForm)

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
isLoggedIn,
isOwner,
upload.single('listing[image]'),
 validateListing,
 wrapAsync (listingController.updateListing))

 .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

// Index Route


   

   // Show Route

   //Create Route


// Edit Route

router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync (listingController.renderEditForm));

// Update Route

// DELETE Route


// Search Route

// router.get("/search", async(req,res) => {
//    try{
//       const page = parseInt(req.query.page) -1||0;
//       const limit = parseInt(req.query.limit) ||5;
//       const search = req.query.search || "";
//       const sort = req.query.sort || "rating";
//       let genre = req.query.genre || "All";

//       const genreOptions = [
//          "City",
//          "Mountain",
//          "Camping",
//          "Farms",
//          "Arctic",
//          "Trending",
//          "Boat"
//       ];
//       genre ==="All"
//       ?(genre = [...genreOptions])
//       :(genre = req.query.genre.split(","));
//       req.query.sort?(sort= req.query.sort.split(",")):(sort= [sort]);

//       let sortBy = {}
//          if(sort[1]){
//             sortBy[sort[0]] = sort[1];
//          }else{
//             sortBy[sort[0]] = "asc";
//          }
//       const searchs = await Listing.find({name:{$regex:search,$options:"i"}})
//          .where("genre")
//          .in([...genre])
//          .sort(sortBy)
//          .skip(page * limit);

         
//          res.status(200);


//    }catch(err){
//       console.log(err);
//       res.status(500).json({error:true,message:"Internal Server Error"});
//    }
// });

module.exports = router;
   