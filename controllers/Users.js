const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign up
exports.postUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const role = req.body.role;

    User.findOne({email: email})
        .then(user => {
            // Email validation
            if (user) {
                const error = new Error("A user with this e-mail already exists.");
                error.statusCode = 401;
                throw error;
            }
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword,
                    name: req.body.name,
                    role: req.body.role,
                    shifts: null
                });
                user.save()
                .then(result => {
                    console.log("User created: ", result);
                    res.status(201).json({message: "User Created", userId: result._id})
                })
                .catch(err => {
                    console.log(err);
                });
            })

        })
    // add password validation
    // add role validation
    // add password hashing and salting

};

exports.putUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let foundUser;
    User.findOne({ email: email})
        .then(user => {
            if (!user) {
                const error = new Error("No user with this email was found.");
                error.statusCode = 401;
                throw error;
            }
            foundUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Incorrect Password.");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: foundUser.email,
                    userId: foundUser._id.toString()
                },
                "qwerouqweoiruqonlksdanfmnxva;sdfklasdjf",
                { expiresIn: "1h"}
            );
            res.status(200).json(
                {
                    token: token,
                    userId: foundUser._id.toString()
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}