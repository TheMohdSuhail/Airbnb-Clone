const Listing = require("../models/listing");
const mapAPI = process.env.MAP_API;
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const geocodingClient = mbxGeocoding({accessToken:mapAPI})

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
   };


module.exports.renderNewForm =  (req,res)=>{
 
    res.render("./listings/new.ejs",{})
};

module.exports.showListing = async (req, res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listings){
     req.flash("error","Listing you requested for does not exist!");
     res.redirect("/listings");
    }
    console.log(listings);
    res.render("./listings/show.ejs",{listings});

};

module.exports.createListing = async (req,res, next)=>{
//    let response = await geocodingClient.forwardGeocode({
//         query: res.body.listing.location,
//         limit: 1,
//       })
//         .send();
//       console.log(response.body.features);
//       res.send("done"); 

    // let {title,descriptions, price,image,country,location} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"..",filename);
    const newListing= new Listing(req.body.listing);
    newListing.owner =req.user._id;
    newListing.image={url,filename};
    // newListing.geometry = response.body.feature[0].geometry;
    // let saveListing = await newListing.save();
    // console.log(saveListing)
    await  newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
       }

       let originalImageUrl = listing.image.url;
       originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing,originalImageUrl});

};

module.exports.updateListing = async (req, res)=>{
    let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

   if(typeof req.file !=="undefined")
  { let url = req.file.path;
   let filename = req.file.filename;
   listing.image = {url,filename};
   await listing.save();
}
   req.flash("success","Listing Updated");
   res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};