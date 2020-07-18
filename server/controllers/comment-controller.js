const { Comment } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
//search this to see where it is used - then remove if not needed

module.exports = {  //I don't see where we would use this
    async getAllComments(req, res) {
        const comments = await Comment.find();
        return res.json(comments);

    },
    // async getCommentsByPost(req, res) {
    //     const comments = await Comment.find();
    //     return res.json(comments);

    // }


    //get comments by userId    (see your comments... or other users... maybe on profile?)


    async getCommentsByUser(req, res) { //needs testing
        console.log("**");
        console.log(req.params);
        console.log("**");
        try {
            const foundComments = await Comment.find({  //this refuses to find anything except all or nothing
                // "userId": req.params.userId
                "userId" : "5f0e5dec363f2c2600a65876"    //this works in mongoDB

            });//this is  not functional yet...
            
                // seems to return all comments... or none
                
            if (foundComments) {console.log("found user?");
            console.log(foundComments); // this is returning an empty bracket... so returns anything
        }
            if (!foundComments) {
                return res.status(400).json({ message: 'Cannot find comments for this user!' });
            }

            return res.json(foundComments);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    //get comments by postId    (see posts comments)

    // async getCommentsByPost({ myPost = null, params }, res) {
    //     const foundUser = await User.findOne({
    //       $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    //     });

    //     if (!foundUser) {
    //       return res.status(400).json({ message: 'Cannot find a user with this id!' });
    //     }

    //     res.json(foundUser);
    //   },


// postComment

//editComment

};