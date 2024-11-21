var jwt = require("jsonwebtoken");
require("dotenv/config");
const secret = process.env.SEC_PASS;
const verifyRole = (req, res, next) => {
    try {
        const token = req.header("authtoken");
        if (!token) {
            res.status(401).send({
                err: "Please Authenticate With Correct Credentials",
            });
        }
        const data = jwt.verify(token, secret);
        console.log("Decoded Token: ", data);
        req.user = data.user;
        next();
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports = verifyRole;
