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


module.exports = router;
   