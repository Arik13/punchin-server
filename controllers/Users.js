const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../secretkey");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Contractor = require("../models/Contractor");

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
                let user;
                console.log("Role: ", role);
                switch(role) {
                    case ("Employee"):
                        console.log("Employee Created");
                        user = new Employee({
                            email: email,
                            password: hashedPassword,
                            name: name,
                        });
                        break;
                    case ("Contractor"):
                        console.log("Contracter Created");
                        user = new Contractor({
                            email: email,
                            password: hashedPassword,
                            name: name,
                        });
                        break;
                    default:
                        const error = new Error("This role does not exist");
                        error.statusCode = 400;
                        throw err;
                }
                user.save()
                    .then((user) => {
                        res.status(201).json({message: "User Created", userId: user._id})
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })

        })
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
                    userId: foundUser._id.toString(),
                    role: foundUser.role,
                },
                secret,
                { expiresIn: "1h"}
            );
            res.status(200).json(
                {
                    token: token,
                    userId: foundUser._id.toString(),
                    role: foundUser.role,
                    isEmployed: !!foundUser.contractorId || foundUser.role == "Contractor",
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}