var mongoose = require('mongoose');
var config = require('../config');

console.log(config);
//mongoose.connect(config.dev.dbUrl);

var taskSchema = new mongoose.Schema({
	fbId: String,
	title: String,
	text: String,
	createdDate: Date,
	dueDate: Date,
	completed: Boolean,
});


module.exports = mongoose.model('Task', taskSchema);