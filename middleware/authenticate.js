// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function authenticateToken(req, res, next) {
    // Extract token from request headers, query parameters, cookies, etc.
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is in the Authorization header

    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: 'Forbidden: Invalid token' });
        }
        try {
            // Fetch user from the database based on decoded token information
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            // Attach user information to the request object
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
    });
}

module.exports = authenticateToken;
