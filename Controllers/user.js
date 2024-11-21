const User = require("../Models/User");
const Post = require("../Models/Post");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { decrypt } = require("dotenv");
require("dotenv/config");
const secret = process.env.SEC_PASS;
const salt = 11;

// FUNCTION TO ADD/SIGNUP USER
exports.registerUser = async (req, res, next) => {
    try {
        console.log("SignUp Request Body: ", req.body)
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        });
        const exists = await User.findOne({ username: req.body.username });
        console.log(exists);
        if (exists) {
            return res.json("User Already Exists");
        }
        const secpass = await bcrypt.hash(user.password, 11);
        user.password = secpass;
        const saveduser = await user.save();
        res.json(saveduser);
    } catch (err) {
        res.status(res.statusCode);
        return next(err);
    }
};

//FUNCTION TO LOGIN USER
exports.loginUser = async (req, res, next) => {
    try {
        console.log("Login Request Body: ", req.body)
        const user = await User.findOne({ username: req.body.username });
        // console.log("User", user);

        if (!user) {
            return res.json("Try To Login Again");
        }

        // Decrypt the data
        const bytes = CryptoJS.AES.decrypt(req.body.password, secret);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);



        const compare = await bcrypt.compare(decryptedData, user.password);

        if (!compare) {
            return res.json("Try To Login Again");
        }


        const data = {
            user: {
                id: user.id,
            },
        };

        var token = jwt.sign(data, secret, { expiresIn: 60 * 24 });
        res.json({
            token: token,
            role: user.role,
        });
    } catch (err) {
        res.status(res.statusCode);
        return next(err);
    }
};