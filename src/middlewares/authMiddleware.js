const { secret, sessionName } = require('../constants');
const jwt = require('jsonwebtoken');
const { promisify } = require('util'); 

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    let token = req.cookies[sessionName];

    if(token) {
        try {
            let decodetToken = await jwtVerify(token, secret);
            req.user = decodetToken;

            res.locals.user = decodetToken;
        } catch(err) {
            console.log(err);
            return req.redirect('/404');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }
    next();
};