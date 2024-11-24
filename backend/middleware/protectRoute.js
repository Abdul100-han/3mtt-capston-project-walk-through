// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Access Denied');

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid Token');
//     }
// };

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Authorization Header:', token); // Debugging the token

    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Verified Token:', verified); // Debugging the decoded token
        req.user = verified;
        next();
    } catch (err) {
        console.log('JWT Verification Error:', err.message); // Debugging error
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticate;
