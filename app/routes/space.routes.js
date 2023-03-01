module.exports = app => {
    const spaces = require("../controllers/space.controller.js");

    var router = require("express").Router();

    // Create a new Space
    router.post("/", spaces.create);

    // Retrieve all Spaces
    router.get("/", spaces.findAll);

    // Retrieve all published Spaces
    router.get("/published", spaces.findAllPublished);

    // Retrieve a single Space with id
    router.get("/:id", spaces.findOne);

    // Update a Space with id
    router.put("/:id", spaces.update);

    // Delete a Space with id
    router.delete("/:id", spaces.delete);

    // Delete all Spaces
    router.delete("/", spaces.deleteAll);

    app.use('/api/spaces', router);
};