const http = require('http');
const FeedParser = require('feedparser');
var mongoose = require('mongoose');

// MongoDb and model management
var postSchema = mongoose.Schema({
	feed: String,
	title: String,
	link: String,
	description: String
});

var PostModel = mongoose.model('Post', postSchema);



require('../index');
function fetchRss (url, success, error) {
	var feedMeta;
	var items = [];

	http.get(url, function(res) {
		res.pipe(new FeedParser({}))
				.on('error', error)
				.on('meta', function(meta){
					feedMeta = meta;
				})
				.on('readable', function(){
					var stream = this, item;

					while (item = stream.read()) {
						var postModel = new PostModel({
							"feed": feedMeta ? feedMeta.title : "n/a",
							"title": item.title,
							"link": item.link,
							"description": item.description
						});

						items.push(postModel);
						postModel.save();
					}
				})
				.on('end', function(){
					var result = {
						"title": feedMeta.title,
						"items": items
					};

					success(result);
				});
	});
};

module.exports.fetchRss = fetchRss;
