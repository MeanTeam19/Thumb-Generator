(function () {
    'use strict';

    let mongoose = require('mongoose'),
        encryption = require('../../utilities/encryption'),
        tagRegex = /<[A-Za-z\s]+>.*<\/[A-Za-z\s]+>|<[A-Za-z\s]+\/\s*>/g,
        mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        birthDateRegex = /^([0-9]{2}).([0-9]{2}).([0-9]{4})$/,
        Schema = mongoose.Schema;

    module.exports.init = function () {
        let userSchema = new Schema();

        userSchema.add({
            username: {
                type: String,
                required: true,
                require: '{PATH} is required',
                unique: true,
                minlength: 2,
                validation: function (val) {
                    return !tagRegex.test(val);
                }
            },
            email: {
                type: String,
                required: true,
                unique: true,
                validation: function (val) {
                    return !mailRegex.test(val);
                }
            },
            firstName: {
                type: String,
                minlength: 2,
                validation: function (val) {
                    return !tagRegex.test(val);
                }
            },
            lastName: {
                type: String,
                require: '{PATH} is required',
                minlength: 2,
                validation: function (val) {
                    return !tagRegex.test(val);
                }
            },
            birthDate: {
                type: Date,
                validation: function (val) {
                    return !birthDateRegex.test(val);
                }
            },
            sex: Boolean,
            friends: [],
            posts: [{
                post: {
                    required: true,
                    type: String,
                    validation: function (val) {
                        return !tagRegex.test(val);
                    },
                    minlength: 6,
                    maxlength: 500
                }
            }],
            salt: String,
            hashPass: String,
            role: {
                type: [String],
                default: ['standard']
            },
        });

        userSchema.method({
            authenticate: function (password) {

                console.log(encryption.generateHashedPassword(this.salt, password));
                console.log(this);
                if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });

        let User = mongoose.model('User', userSchema);
    };
} ());