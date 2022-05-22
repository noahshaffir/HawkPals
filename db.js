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
    const result = await new Promise((res, rej) => {
        con.query(sql, [username, email], (err, result, field) => {
            if (err){
                rej(err)
            }
            else{res(result)}
        });
        con.end()
    }).then(result => result)
    return result
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
    valid = await checkUidExists(username, email)
    
    if (valid.length > 0){
        return "Username Already Exists!"
    }

    // createUser(name, email, username, pwd)
}

function login(uid, pwd){
    if (!uid, !pwd){return "Empty Input"}
}

module.exports.signup = signup

module.exports.login = login