const User = require('../models/User')
const bcrypt = require('bcrypt');

const saltRounrs = 10;



exports.register = async ({username, password, repeatPassword}) => {
    if (password !== repeatPassword) {
        return false;
    }
    
    let hashedPass = await bcrypt.hash(password, saltRounrs);

    let createdUser = User.create({
        username,
        password: hashedPass
    });

    return createdUser; 
}