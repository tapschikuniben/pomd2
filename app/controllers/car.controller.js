const Car = require("../models/car.model.js");

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Car
    const car = new Car({
        user_n: req.body.user_n,
        make: req.body.make,
        model: req.body.model,
        reg: req.body.reg,
        assoc: req.body.assoc,
        assoc_n: req.body.assoc_n

    });

    // Save Car in the database
    Car.create(car, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Car."
            });
        else res.send(data);
    });
};

// Retrieve all Cars from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Car.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cars."
            });
        else res.send(data);
    });
};

// find all published Cars
exports.findAllPublished = (req, res) => {
    Car.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cars."
            });
        else res.send(data);
    });
};

// Find a single Car with a id
exports.findOne = (req, res) => {
    Car.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Car with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Car with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Car identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Car.updateById(
        req.params.id,
        new Car(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Car with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Car with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
    Car.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Car with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Car with id " + req.params.id
                });
            }
        } else res.send({ message: `Car was deleted successfully!` });
    });
};

// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
    Car.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all cars."
            });
        else res.send({ message: `All Cars were deleted successfully!` });
    });
};