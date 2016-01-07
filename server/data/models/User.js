(function () {
    'use strict';

    let mongoose = require('mongoose'),
        encryption = require('../../utilities/encryption'),
        tagRegex = /<[A-Za-z\s]+>.*<\/[A-Za-z\s]+>|<[A-Za-z\s]+\/\s*>/g,
        mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    let Schema = mongoose.Schema;

    module.exports.init = function () {
        var userSchema = new Schema({
            id: Schema.Types.ObjectId,
            username: {
                type: String,
                require: '{PATH} is required',
                unique: true,
                maxlength: 30,
                minlength: 6,
                validation: function (val) {
                    return tagRegex.test(val);
                }
            },
            email: {
                type: String,
                require: '{PATH} is required',
                unique: true,
                validation: function (val) {
                    return mailRegex.test(val);
                }
            },
            firstName: {
                type: String,
                require: '{PATH} is required',
                unique: true,
                maxlength: 30,
                minlength: 6,
                validation: function (val) {
                    return tagRegex.test(val);
                }
            },
            lastName: {
                type: String,
                require: '{PATH} is required',
                unique: true,
                maxlength: 30,
                minlength: 6,
                validation: function (val) {
                    return tagRegex.test(val);
                }
            },
            birthDate: {
                type: Date
                // TODO: Validation?
            },
            sex: Boolean,
            friends: {
                Type: [userSchema]
            },
            // posts: {
            //     Type: [postSchema]
            // },
            salt: String,
            hashPass: String
        });

        userSchema.method({
            authenticate: function (password) {
                if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });

        var User = mongoose.model('User', userSchema);
    };
} ());
