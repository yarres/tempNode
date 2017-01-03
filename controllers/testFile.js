const fs = require('fs');


/**
 * GET /contact
 * Contact form page.
 */
// cf
// https://www.youtube.com/watch?v=1DMolJ2FrNY&t=204s
// faire un readFileSync()

exports.getFile = (req, res) => {
  var output = fs.readFile('./public/temp2.txt', 'utf8', function(data, err) {
    if (err) return console.error(err);

   // transforms the string into an array separated by the end of
    // line caracter

  });
  outputA = output.split('\n');
    //output = output.trim().split('\n');
  console.log(outputA + typeof output);
    res.render('testFile', {
      title: 'Testing file',
      output: output
    });

};
