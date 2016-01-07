(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        tagRegex = /<[A-Za-z\s]+>(.|\n)*<\/[A-Za-z\s]+>|<[A-Za-z\s]+\/\s*>/gm;

    module.exports.init = function () {
        let postSchema = new Schema();

        postSchema.add({
            id: Schema.Types.ObjectId,
            user: {
                required: true,
                type: String,
            },
            body: {
                required: true,
                type: String,
                validation: function(val) {
                    return !tagRegex.test(val);
                },
                minlength: 6,
                maxlength: 500
            },
            numberOfLikes: Number
            // TODO: Prolly add a "liked by prop"
        });
        let Post = mongoose.model('Post', postSchema);
    }
} ());