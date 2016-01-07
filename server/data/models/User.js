(function () {
    'use strict';

    let mongoose = require('mongoose'),
        encryption = require('../../utilities/encryption'),
        tagRegex = /<[A-Za-z\s]+>.*<\/[A-Za-z\s]+>|<[A-Za-z\s]+\/\s*>/g,
        mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        birthDateRegex = /^([0-9]{2}).([0-9]{2}).([0-9]{4})$/; //07.01.2016

    let Schema = mongoose.Schema;

    module.exports.init = function () {
        var userSchema = new Schema();

        userSchema.add({
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
                maxlength: 30,
                minlength: 6,
                validation: function (val) {
                    return tagRegex.test(val);
                }
            },
            lastName: {
                type: String,
                require: '{PATH} is required',
                maxlength: 30,
                minlength: 6,
                validation: function (val) {
                    return tagRegex.test(val);
                }
            },
            birthDate: {
                type: Date,
                validation: function (val) {
                    return birthDateRegex.test(val);
                }
            },
            sex: Boolean,
            friends: [userSchema],
            // posts: [postSchema],
            // photos: [photoSchema],
            salt: String,
            hashPass: String,
            role: {
                type: String,
                enum: 'regular admin'.split(' ')
            },
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