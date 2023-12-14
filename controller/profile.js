const sql = require('mssql');
const connectionString = require('../utils/ConnectionString');
const renderProfile = (req, res) =>{
    const user = req.session.user;
    if (!user){
        res.redirect('/')
    }
    res.render("profile", {user: user});
}
const updateProfile = async (req, res) => {
    const { username, email } = req.body;
    const userId = req.session.user.id;
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        request.input('username', sql.NVarChar, username);
        request.input('email', sql.NVarChar, email);
        request.input('userId', sql.Int, userId);
        const query = `UPDATE USERS SET username = @username, email = @email WHERE id = @userId`;
        const result = await request.query(query);
        const row = result.rowsAffected[0];
        if (row !== 0){
            req.session.user = {
                id: userId.id,
                username: username,
                email: email,
            }
        }
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.render("error");
    }
}
module.exports = {
    renderProfile,
    updateProfile
}