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

module.exports.set_canada_as_country = set_canada_as_country;
module.exports.strip_punctuation_from_name = strip_punctuation_from_name;
module.exports.capitalize_names = capitalize_names;
module.exports.pipeline_each = pipeline_each;
