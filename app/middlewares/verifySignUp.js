const user = require("./../models/user.model");

checkUserDuplicateEmail = (req, res, next) => {

    user.findByEmail(req.body.email, (err, data) => {
        if (data.length > 0) {
            res.send({ message: "Failed! Email is already in use!" });
            return;
        }

        if (data.length == 0) {
            next();
            return;
        }
    });
}


const verifySignUp = {
    checkUserDuplicateEmail
};

module.exports = verifySignUp;