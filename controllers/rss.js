/**
 * GET /contact
 * Contact form page.
 */
exports.getRSS = (req, res) => {
  res.render('rss', {
    title: 'Rss'
  });
};


const crawlRSS = require('../app/crawlrss');

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postRSS = (req, res) => {
  //req.assert('rss', 'Rss cannot be blank').notEmpty();
  // req.assert('email', 'Email is not valid').isEmail();
  console.log(req.body.rss);

  var temp = crawlRSS.fetchRss(req.body.url,function(result) {
		res.send(result);
	}, function(error) {
		res.send("failed with error: " + error);
});
  //const errors = req.validationErrors();

  // if (errors) {
  // //  req.flash('errors', errors);
  // console.log(errors);
  //   return res.redirect('/contact');
  // }

};
