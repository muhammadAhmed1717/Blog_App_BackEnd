const Post = require("../Models/Post");
const User = require("../Models/User");
// GET ALL POST
exports.getAll = async (req, res, next) => {
    try {
        const post = await Post.find();
        res.json(post);
    } catch (err) {
        res.status(res.statusCode);
        return next(err);
    }
};

// GET POST BY ID
exports.getByID = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json("message", err);
    }
};

// CREATE POST
exports.create = async (req, res, next) => {
    try {
        const finduser = await User.findById(req.user.id);
        req.body.author = finduser.username;
            const post = new Post({
                title: req.body.title,
                conent: req.body.content,
                author: req.body.author,
            });
            const savedpost = await post.save();
            // res.status(200).json(savedpost);
            res.json("Post Created Successfully");
    } catch (err) {
        res.status(res.statusCode);
        return next(err);
    }
};

// DELETE POST BY ID
exports.remove = async (req, res, next) => {
    try {
        const removedpost = await Post.findByIdAndDelete(req.params.id);
        res.json(removedpost);
    } catch (err) {
        res.status(res.statusCode);
        return next(err);
    }
};

// UPDATE POST BY ID
exports.update = async (req, res, next) => {
    try {
        const options = { upsert: true };
        const updatedPost = { $set: { title: req.body.title } };
        const result = await Post.updateOne(
            { _id: req.params.id },
            updatedPost,
            options
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(res.statusCode);
        return next(err);
    }
};