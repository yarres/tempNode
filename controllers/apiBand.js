const Band = require('../models/Band');
// use mongoose to get all todos in the database

const fetchedBands = [];
let error = true;
Band.findOne({ name: 'THE DOORS' }, (err, bandF) => {
  if (!err) {
    fetchedBands.push(bandF);
    error = false;
    //  console.log(bands);
    // process.exit();
  } else {
    error = true;
    throw err;
  }
});

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.getBands = (req, res) => {
  if (error) {
    res.send(error);
  } else {
    res.json(fetchedBands);
  }
}
