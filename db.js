const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "us-cdbr-east-03.cleardb.com",
    user: "bf754cf46832ed",
    password: "645e6a6c",
    port: 3306,
    database: "heroku_5eda4e9e72c2e3d",
});

function getAllMemos(callback) {
    connection.query(
        `SELECT * FROM MEMOS ORDER BY ID DESC`,
        (err, rows, fields) => {
            if (err) throw err;
            callback(rows);
        }
    );
}

module.exports = {
    getAllMemos,
};
