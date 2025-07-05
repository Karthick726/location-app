const mysql2=require("mysql2");


const db=mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"e-com"
})


db.getConnection((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

module.exports = db;