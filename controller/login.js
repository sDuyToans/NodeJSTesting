const Operation = require('../utils/Operation');
const bcrypt = require('bcrypt');
const renderLogin = (req, res) =>{
    res.render("login");
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = `SELECT * FROM USERS WHERE email = '${email}'`;
        const result = await Operation.executeQuery(query);
        const user = result.recordset[0];
        console.log(user)
        if (!user) {
            res.render("login", { errorMess: "Invalid email or password" });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.userpassword);
        if (passwordMatch) {
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
            }
            res.redirect("/");
        } else {
            res.render("login", { errorMess: "An error occurred" });
        }
    } catch (e) {
        console.log(e);
        res.render("login", { errorMess: "An error occurred" });
    }
}

module.exports = {
    renderLogin,
    login
}