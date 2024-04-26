const express = require('express');
const router = express.Router();
const Listing = require('../models/listing'); // Replace with your listing model path

router.get('/search/:key', async (req, res) => {
  const { key } = req.params;

  try {
    // Enhanced search criteria handling:
    const query = {};
    if (key) {
        // Search by title (case-insensitive):
        query.title = { $regex: key, $options: 'i' }; // 'i' for case-insensitive
      } else {
      // Handle empty search or provide default results (optional):
      // res.send([]); // Send an empty array or implement default search behavior
    }

    // Search based on the constructed query:
    const listings = await Listing.find(query);

    if (listings.length === 0) {
      // Handle no matching results gracefully:
      res.status(200).json({ message: 'No listings found matching your search criteria.' });
    } else {
      res.status(200).json(listings);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

module.exports = router;
