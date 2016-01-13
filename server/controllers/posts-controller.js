var User = require('mongoose').model('User');

var CONTROLLER_NAME = 'posts';

module.exports = {
    post: function (req, res) {
        var post = req.body;
        User.findOne({ _id: req.user.id }, function (err, user) {
            if (err) {
                console.log(err);
            }
            
            console.log(user)
            console.log(user.posts);
            
            var userPosts = user.posts;
            userPosts.push(post);
           
            
            user.update({posts: userPosts}, function(err) {
                if(err) {
                    console.log(err);
                }
            })
        })
    }
};
