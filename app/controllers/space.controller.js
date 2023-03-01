const Space = require("../models/space.model.js");

// Create and Save a new Space
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Space
    const space = new Space({
        title: req.body.title,
        descr: req.body.descr,
        type: req.body.type,
        user_n: req.body.user_n,
        addr1: req.body.addr1,
        addr2: req.body.addr2,
        addr3: req.body.addr3,
        addr4: req.body.type,
        postcode: req.body.postcode,
        map_lat: req.body.map_lat,
        map_lon: req.body.map_lon,
        registered: req.body.registered,
        status: req.body.status,
        admin: req.body.admin,
        user_admin: req.body.user_admin,
        avg_user_rating: req.body.avg_user_rating,
        num_user_ratings: req.body.num_user_ratings,
        num_user_reviews: req.body.num_user_reviews,
        photo_status: req.body.photo_status,
        photo_date: req.body.photo_date,
        photo_filename: req.body.photo_filename,
        msp_parent: req.body.msp_parent,
        msp_designation: req.body.msp_designation,
        managed: req.body.managed,
        time_matrix: req.body.time_matrix,
        filter_off: req.body.filter_off,
        is_featured: req.body.is_featured,
        list_position: req.body.list_position,
        location_keyword: req.body.location_keyword,
        is_ev: req.body.is_ev,
        is_sameday: req.body.is_sameday,
        notes: req.body.notes
    });

    // Save Space in the database
    Space.create(space, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Space."
            });
        else res.send(data);
    });
};

// Retrieve all Spaces from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Space.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving spaces."
            });
        else res.send(data);
    });
};

// find all published Spaces
exports.findAllPublished = (req, res) => {
    Space.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving spaces."
            });
        else res.send(data);
    });
};

// Find a single Space with a id
exports.findOne = (req, res) => {
    Space.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Space with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Space with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Space identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Space.updateById(
        req.params.id,
        new Space(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Space with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Space with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Space with the specified id in the request
exports.delete = (req, res) => {
    Space.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Space with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Space with id " + req.params.id
                });
            }
        } else res.send({ message: `Space was deleted successfully!` });
    });
};

// Delete all Spaces from the database.
exports.deleteAll = (req, res) => {
    Space.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all spaces."
            });
        else res.send({ message: `All Spaces were deleted successfully!` });
    });
};