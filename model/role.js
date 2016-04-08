var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	name : {type: String, required: true},
	parent : { type: Schema.Types.ObjectId, ref: 'Role'},

	// The other way around
	users : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Role	= mongoose.model('Role', roleSchema);