const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounrs = 10;
const secret = 'mysecret';


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
};

exports.login = async ({username, password}) => {

    let user = await User.findOne({username});

    if (!user) {
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return;
    } 

    let result = new Promise((resolve, reject) => {

        jwt.sign({_id: user._id, username: user.username}, secret, {expiresIn: '1d'}, (err, token) => {
            if (err) {
                return reject(err);
            }
            
            resolve(token);
        });
    });

    return result;
}