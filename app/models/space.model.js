const sql = require("./db.js");

// constructor
const Space = function(space) {
    this.title = space.title,
        this.descr = space.descr,
        this.type = space.type,
        this.user_n = space.user_n,
        this.addr1 = space.addr1,
        this.addr2 = space.addr2,
        this.addr3 = space.addr3,
        this.addr4 = space.addr4,
        this.postcode = space.postcode,
        this.map_lat = space.map_lat,
        this.map_lon = space.map_lon,
        this.registered = space.registered,
        this.status = space.status,
        this.admin = space.admin,
        this.user_admin = space.user_admin,
        this.avg_user_rating = space.avg_user_rating,
        this.num_user_ratings = space.num_user_ratings,
        this.num_user_reviews = space.num_user_reviews,
        this.photo_status = space.photo_status,
        this.photo_date = space.photo_date,
        this.photo_filename = space.photo_filename,
        this.msp_parent = space.msp_parent,
        this.msp_designation = space.msp_designation,
        this.managed = space.managed,
        this.time_matrix = space.time_matrix,
        this.filter_off = space.filter_off,
        this.is_featured = space.is_featured,
        this.list_position = space.list_position,
        this.location_keyword = space.location_keyword,
        this.is_ev = space.is_ev,
        this.is_sameday = space.is_sameday,
        this.notes = space.notes
};

Space.create = (newSpace, result) => {
    sql.query("INSERT INTO spaces SET ?", newSpace, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created space: ", { n: res.insertId, ...newSpace });
        result(null, { n: res.insertId, ...newSpace });
    });
};

Space.findById = (n, result) => {
    sql.query(`SELECT * FROM spaces WHERE n = ${n}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found space: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Space with the n
        result({ kind: "not_found" }, null);
    });
};

Space.getAll = (title, result) => {
    let query = "SELECT * FROM spaces";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("spaces: ", res);
        result(null, res);
    });
};

Space.getAllPublished = result => {
    sql.query("SELECT * FROM spaces WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("spaces: ", res);
        result(null, res);
    });
};

Space.updateById = (n, space, result) => {
    sql.query(
        "UPDATE spaces SET title = ?, descr = ?, type = ?, user_n = ?, addr1 = ?, addr2 = ?, addr3 = ?, addr4 = ?, postcode = ?, map_lat = ?, map_lon = ?, registered = ?, status = ?, admin = ?, user_admin = ?, avg_user_rating = ?, num_user_ratings = ?, num_user_reviews = ?, photo_status = ?, photo_date = ?, photo_filename = ?, msp_parent = ?, msp_designation = ?, managed = ?, time_matrix = ?, filter_off = ?, is_featured = ?, list_position = ?, location_keyword = ?, is_ev = ?, is_sameday = ?, notes = ? WHERE n = ?", [space.title, space.descr, space.type, space.user_n, space.addr1, space.addr2, space.addr3, space.addr4, space.postcode, space.map_lat, space.map_lon, space.registered, space.status, space.admin, space.user_admin, space.avg_user_rating, space.num_user_ratings, space.num_user_reviews, space.photo_status, space.photo_date, space.photo_filename, space.msp_parent, space.msp_designation, space.managed, space.time_matrix, space.filter_off, space.is_featured, space.list_position, space.location_keyword, space.is_ev, space.is_sameday, space.notes, n],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Space with the n
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated space: ", { n: n, ...space });
            result(null, { n: n, ...space });
        }
    );
};

Space.remove = (n, result) => {
    sql.query("DELETE FROM spaces WHERE n = ?", n, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Space with the n
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted space with n: ", n);
        result(null, res);
    });
};

Space.removeAll = result => {
    sql.query("DELETE FROM spaces", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} spaces`);
        result(null, res);
    });
};

module.exports = Space;