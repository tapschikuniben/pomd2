module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const verifySignUP = require("../middlewares/verifySignUp.js");

    var router = require("express").Router();

    // Create a new User
    // router.post("/", users.create);

    // Create a new User
    router.post('/api/auth/users', [
            verifySignUP.checkUserDuplicateEmail
        ],
        users.create);

    // Retrieve all Users
    router.get("/api/users/", users.findAll);

    // Retrieve a single User with id
    router.get("/api/users/:id", users.findOne);

    // Update a User with id
    router.put("/api/users/:id", users.update);

    // Delete a User with id
    router.delete("/api/users/:id", users.delete);

    // Delete all Users
    router.delete("/api/users/", users.deleteAll);

    app.use('/', router);
};