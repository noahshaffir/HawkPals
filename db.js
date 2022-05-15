const mysql = require('mysql')
const util = require('util');
const validator = require("email-validator")
require('dotenv').config()

const con = mysql.createConnection({
    host: "46.17.172.154",
    user: "u581004658_HawkPals",
    password: process.env.PASS,
    database: "u581004658_users"
  });

const query = util.promisify(con.query).bind(con);

function checkValidUsername(username){
    if(/^[a-zA-Z0-9_]*$/.test(username)){return true}
    return false
}

function checkValidPwd(pwd, pwdRepeat){
    if (pwd !== pwdRepeat){return false}
    if (pwd.length < 8){return false}
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/.test(pwd)){
        return false
    }
    return true
}

async function checkUidExists(username, email){
    sql = "SELECT * FROM users WHERE userUid = ? OR userEmail = ?;"
    r = []
    con.query(sql, [username, email], (err, result, field) => {
        if (err){throw err}
        r.push(result)
    });
    con.end()
    return r
}

async function signup(name, email, username, pwd, pwdRepeat){
    if (!name || !email || !username || !pwd || !pwdRepeat)
    {
        return "Empty Input"
    }

    valid = validator.validate(email)
    if (!valid){return "Invalid Email"}

    valid = checkValidUsername(username)
    if (!valid){return "Invalid Username"}

    valid = checkValidPwd(pwd, pwdRepeat)
    if (!valid){return "Invalid/Mismatch Password"}

    console.log("Running")
    valid = await checkUidExists(username, email)
    console.log(valid)

    // if (valid){return "Username already exists!"}

    // createUser(name, email, username, pwd, pwdRepeat)
    console.log('Ran')
}

signup('Gary', 'singhgk.fateh@gmail.com', 'Gary', '4wEbkv76&Nev!GQI', '4wEbkv76&Nev!GQI')

function login(uid, pwd){
    if (!uid, !pwd){return "Empty Input"}
}

module.exports.signup = signup

module.exports.login = login