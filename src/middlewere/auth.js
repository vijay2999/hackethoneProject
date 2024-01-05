const jwt = require("jsonwebtoken");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");

const authenticate = function (req, res, next) {
    try {

        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({ status: false, message: "no token found" })
        }
        jwt.verify(token, "digiflake", function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            }
            req.decodedToken = decodedToken
            console.log(decodedToken)
            next();
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//

module.exports = { authenticate}