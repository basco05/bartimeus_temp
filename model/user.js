var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username : {type: String, required: true},
	password : {type: String, required: true},
	active : {type: Boolean, required: true, default: false},
	mustResetPassword : {type: Boolean, required: true, default: false},
	email : {type: Boolean, required: true},
	role : { type: Schema.Types.ObjectId, ref: 'Role' }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports	= mongoose.model('User', userSchema);