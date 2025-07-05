const User = require("../Model/userModel");
const db=require("../Config/db")

// exports.getUsers = async (req, res) => {
//     try {
//         User.getAllUsers((err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.json(results);
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.addUser = async (req, res) => {

    try {
        console.log(req.body)
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required" });
        }

        const sql="INSERT INTO user (name,email) VALUES (?,?)";
        const [results]=await db.execute(sql,[name,email]);
        console.log(results);
        res.status(200).json({ message: "User added successfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
