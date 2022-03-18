const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config/keys.json');

function authenticateToken(req, res, next)
{
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if(!token) return res.status(403).send({statusCode:403, message: "Not allowed to perform this operation without access token",data:[]});

    jwt.verify(token, config.SECRETE_KEY, (err, user) => {

        console.log("TTT:::: ", user)
        if(err) return res.status(403).send({statusCode:403, message: "Not allowed to perform this operation without access token",data:[]});
        req.data = user;
        next();
    });

}

module.exports = authenticateToken;