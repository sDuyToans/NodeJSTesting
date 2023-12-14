const sql = require('mssql');
const connectionString = require('../utils/ConnectionString');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const renderSignup = (req, res) =>{
    res.render("signup");
}

const singup = async (req, res) => {
    const { displayName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword){
        res.render("signup");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const pool = await sql.connect(connectionString);
        const result = await pool.request()
            .input('displayName', sql.VarChar, displayName)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO USERS VALUES (@displayName, @email, @password)');
        const newUser = result.recordset[0];
        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        }
        res.redirect("/");
    } catch (error) {
        console.error('Error during signup:', error);
        res.render("error");
    }
}

module.exports = {
    renderSignup,
    singup
}