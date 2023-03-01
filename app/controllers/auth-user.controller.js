const config = require("../config/auth.config.js");
const User = require("../models/user.model.js");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signin = (req, res) => {
    User.findUserByEmail(req.body.email, (err, data) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (data.length > 0) {

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                data[0].password
            );


            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: data[0].n }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: data[0].n,
                email: data[0].email,
                accessToken: token
            });
        }

        if (data.length == 0) {
            return res.status(404).send({ message: "User Not found." });
        }
    })
};