const fs = require('fs');


/**
 * GET /contact
 * Contact form page.
 */
exports.getStream = (req, res) => {
  var stream = fs.createReadStream('./file.md');
  var streamed = stream.pipe(res);

  // streamed.on('data', function(chunk) {
  //   data += chunk;
  // });
  //
  // streamed.on('end', function() {
  //   console.log(data);
  // });
  //
  // res.render('stream', {
  //   title: 'stream',
  //   streamed: streamed
  // });
};
