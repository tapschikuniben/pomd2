const sql = require("./db.js");

// constructor
const User = function(car) {
    this.user_n = car.user_n;
    this.make = car.make;
    this.model = car.model;
    this.reg = car.reg;
    this.assoc = car.assoc;
    this.assoc_n = car.assoc_n
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO cars SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created car: ", { n: res.insertId, ...newUser });
        result(null, { n: res.insertId, ...newUser });
    });
};

User.findById = (n, result) => {
    sql.query(`SELECT * FROM cars WHERE n = ${n}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found car: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the n
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (title, result) => {
    let query = "SELECT * FROM cars";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cars: ", res);
        result(null, res);
    });
};

User.getAllPublished = result => {
    sql.query("SELECT * FROM cars WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cars: ", res);
        result(null, res);
    });
};

User.updateById = (n, car, result) => {
    sql.query(
        "UPDATE cars SET user_n = ?, make = ?, model = ?, reg = ?, assoc = ?, assoc_n = ? WHERE n = ?", [car.user_n, car.make, car.model, car.reg, car.assoc, car.assoc_n, n],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the n
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated car: ", { n: n, ...car });
            result(null, { n: n, ...car });
        }
    );
};

User.remove = (n, result) => {
    sql.query("DELETE FROM cars WHERE n = ?", n, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the n
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted car with n: ", n);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM cars", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} cars`);
        result(null, res);
    });
};

module.exports = User;