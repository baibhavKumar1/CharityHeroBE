const jwt = require('jsonwebtoken');
const BlacklistModel = require('../Model/blacklist.model');
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const blacklistedToken = await BlacklistModel.findOne({ token: token });
        if (blacklistedToken) {
            return res.status(440).json({ message: "Session Expired, Login Again" });
        }

        jwt.verify(token, "SECRET", (err, decoded) => {
            if (decoded) {
                req.body.userId = decoded.userId;
                next();
            } else {
                return res.status(400).json({ message: "Unauthorized" });
            }
        });
    } else {
        res.status(400).json({ message: "Unauthorized" });
    }
}

module.exports = auth