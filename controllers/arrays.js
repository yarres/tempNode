 const Band = require('../models/Band');

fetchedBands = [];
Band.findOne({'name':'THE DOORS'}, function(err, bandF) {
    if (!err){
      fetchedBands.push(bandF);
      //  console.log(bands);
        //process.exit();
    } else {throw err;}
});

console.log(fetchedBands);
//console.log(bandF);

var bands = [
  {'name': 'sunset rubdown', 'country': 'UK', 'active': false},
  {'name': 'women', 'country': 'Germany', 'active': false},
  {'name': 'a silver mt. zion', 'country': 'Spain', 'active': true}
];

var set_canada_as_country = function set_canada_as_country(band) {
  band['country'] = "Canada";
  return band;
}

var strip_punctuation_from_name = function strip_punctuation_from_name(band) {
  band['name'] = band['name'].replace('.', '');
  return band;
}

var capitalize_names = function capitalize_names(band) {
  var nameParts = band['name'].split(' ');
  for(var j in nameParts) {
    nameParts[j] = nameParts[j].charAt(0).toUpperCase() +  nameParts[j].slice(1);
  }
  band['name'] = nameParts.join(" ");
  return band;
}
function pipeline_each(data, functions) {
  return functions.reduce(
    function(newData, currentFunction) {
      return newData.map(function(item) {
        return currentFunction.call(this, item);
      });
    },
    data
  );
}

bands = pipeline_each(
  bands,
  [set_canada_as_country, strip_punctuation_from_name, capitalize_names]
);

//console.log(JSON.stringify(bands));




/**
 * GET /contact
 * Contact form page.
 */
exports.getArrays = (req, res) => {
  res.render('arrays', {
    title: 'Bands',
    bands: bands,
    tempBands: fetchedBands
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postBand = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('country', 'Country cannot be blank').notEmpty();

  // Validation
 const errors = req.validationErrors();
 if (errors) {
   req.flash('errors', errors);
   return res.redirect('/arrays');
}


  // create a new Band
  var band1 = new Band(
    {
      name: req.body.name,
      country: req.body.country,
      rank: req.body.rank
    }
  );

  //Some modifications in user object
  band1.name = band1.name.toUpperCase();

  //Lets try to print and see it. You will see _id is assigned.
  //console.log(band1);

  //save it
  band1.save(function (err, userObj) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved successfully:', userObj);
    }
  });
  req.flash('success', { msg: 'Band has been saved successfully!' });
  res.redirect('/arrays');
};
