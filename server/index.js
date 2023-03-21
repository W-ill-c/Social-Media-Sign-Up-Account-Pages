const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post("/signup", async(req, res) => {
    try{
        const first_name = req.body.userFirstName;
        const second_name = req.body.userSecondName;
        const email = req.body.userEmail;
        const password = req.body.userPassword;
        const newUser = await pool.query(`INSERT INTO userssignupdetails ("user_name", "user_second_name", "user_email", "user_password") VALUES ('${first_name}', '${second_name}', '${email}', '${password}');`)
        // res.sendStatus();
        console.log(first_name);
        console.log(password);
        console.log(newUser)
    } catch(err){
        console.log(err);
    }}
)

app.get("/userPage", async (req, res)=>{
    try{
        const userData = await pool.query("SELECT * FROM userssignupdetails ORDER BY user_id DESC LIMIT 1");
        res.json(userData.rows[0]);
    } catch(err){
        console.log(err)
    }
})

// app.put("/updateEmail", async(req,res) =>{
//     try{
//         const updatedEmail = req.body.newEmail;
//         const userId = req.body.userId
//         const updateUserEmail = await pool.query("UPDATE userssignupdetails SET user_email=${updatedEmail} WHERE userId=${userId}")
//     }catch(err){
//         console.log(err)
//     }
// })

// app.put("/updatePassword", async(req,res) =>{
//     try{
//         const updatedPassword = req.body.newPassword;
//         const userId = req.body.userId
//         const updateUserEmail = await pool.query("UPDATE userssignupdetails SET user_password=${updatedEmail} WHERE user_email=${updateUserEmail}")
//     }catch(err){
//         console.log(err)
//     }
// })

app.delete("/deleteresource/:id", async(req, res) => {
    try{
        const id = req.params.id;
        console.log(req.params);
        // const password = req.body.userPassword;
        const deleteUser = await pool.query(`DELETE FROM userssignupdetails WHERE user_id = ${id}`);
        res.json("User deleted");
    } catch(err){
        console.log(err)
    }
}
)

app.listen(5000, () =>
    console.log("You are connected")
);