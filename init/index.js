const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = "mongodb+srv://themsp:3gcFMvu95Q5BHO1w@cluster0.gnumkkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // await Listing.deleteMany({});
//  initData.data =  initData.data.map((Obj)=>({...Obj,owner:"661e76f7971c3cac39b819e6"}));
  // await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();