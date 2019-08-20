var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({

    //remove user name and password bcoz they are already present in passport-local-mongoose
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose); //this will automatically add user name and password  using hash and salt and also add additional methods for user authentication
module.exports = mongoose.model('User', User);