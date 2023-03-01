const sql = require("./db.js");

// constructor
const User = function(user) {
    this.uid = user.uid;
    this.email = user.email;
    this.pw = user.pw;
    this.password = user.password;
    this.name = user.name;
    this.addr1 = user.addr1;
    this.addr2 = user.addr2;
    this.addr3 = user.addr3;
    this.addr4 = user.addr4;
    this.postcode = user.postcode;
    this.tel = user.tel;
    this.registered = user.registered;
    this.verified = user.verified;
    this.joined = user.joined;
    this.securecode = user.securecode;
    this.status = user.status;
    this.sms = user.sms;
    this.tos = user.tos
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { n: res.insertId, ...newUser });
        result(null, { n: res.insertId, ...newUser });
    });
};

User.findById = (n, result) => {
    sql.query(`SELECT * FROM users WHERE n = ${n}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the n
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (title, result) => {
    let query = "SELECT * FROM users";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email="${email}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length > 0) {
            result(null, res);
            return;
        }

        if (res.length == 0) {
            result(null, "");
            return;
        }
    });
};

User.findUserByEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email="${email}"`, (err, data) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, data);
    });
};

User.updateById = (n, user, result) => {
    sql.query(
        "UPDATE users SET uid = ?, email = ?, pw = ?, name = ?, addr1 = ?, addr2 = ?, addr3 = ?, addr4 = ?, postcode = ?, tel = ?, registered = ?, verified = ?, joined = ?, securecode = ?, status = ?, sms = ?, tos = ? WHERE n = ?", [user.uid, user.email, user.pw, user.name, user.addr1, user.addr2, user.addr3, user.addr4, user.postcode, user.tel, user.registered, user.verified, user.joined, user.securecode, user.status, user.sms, user.tos, n],
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

            console.log("updated user: ", { n: n, ...user });
            result(null, { n: n, ...user });
        }
    );
};

User.remove = (n, result) => {
    sql.query("DELETE FROM users WHERE n = ?", n, (err, res) => {
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

        console.log("deleted user with n: ", n);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User;