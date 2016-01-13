var User = require('mongoose').model('User');

var CONTROLLER_NAME = 'posts';

module.exports = {
    post: function (req, res, next) {
        console.log(req.body);
        var post = req.body.post;
        User.find({ _id: req.body.id }, function (err, user) {
            User.update({ _id: user._id },
                { $pushAll: { 'posts': {'post' : [post]} } }, { upsert: true }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                });
        })
    }
};

// Message.update({_id: '5064aae4154cb34d14000001' },
//         {$pushAll: { 'sent-messages' : delivered }} , {upsert:true}, function(err, data) { 
// 
// });

// User.findOneAndUpdate(
//             { _id: req.body.id },
//             { $push:{posts: [{ post: req.body.post }]}},
//             { safe: true, upsert: true },
//             function (err, model) {
//                 console.log(err);
//             })