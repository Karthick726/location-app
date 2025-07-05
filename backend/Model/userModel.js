const db = require("../Config/db");


const User=async()=>{
    try{
        await db.execute(`CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );`)
    }catch(err){
        console.log(err);
    }
 
}




User()
