const jwt = require("jsonwebtoken");
const secret = require("../secretkey");
const User = require("../models/User");

exports.authenticate = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secret);
    }
    catch(err) {
        console.log(err);
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Not Authenticated.");
        error.statusCode = 401;
        console.log(err);
        throw err;
    }
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    next();
}

// exports.hasContractorPermissions = (req, res, next) => {
//     console.log("Role: ", req.role);
//     if (req.role != "Contractor") {
//         const err = new Error("Not authorized");
//         err.statusCode = 401;
//         throw err;
//     }
//     next();
// }