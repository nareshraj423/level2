var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Configuring a schema for easy interpretation and test activities.
var blogModel = mongoose.Schema({
	title: {
		type: String,
		default: '',
		required: true
	},
	subTitle: {
		type: String,
		default: ''
	},
	blogBody: {
		type: String,
		default: ''
	},
	author: {
		type: String,
		default: ''
	},
	tags: [],
	createdOn: {
		type: Date
	},
	lastModified: {
		type: Date
	}
});

// To be exported to app.js for db configuration.
module.exports = mongoose.model('Blog', blogModel);
