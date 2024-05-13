// Middleware function to check if the user has a specific role
function checkRole(role) {
    // Returning a middleware function
    return (req, res, next) => {
        // Checking if the user exists in the request object and if their role matches the specified role
        if (req.user && req.user.role === role) {
            // If the user has the required role, pass control to the next middleware function
            next();
        } else {
            // If the user does not have the required role, log a message and send a 403 Forbidden response
            console.log('Permission Denied!');
            return res.status(403).json({
                msg: 'Forbidden: Insufficient permissions',
                data: null
            });
        }
    };
    
}

// Exporting the checkRole function to be used in other parts of the application
module.exports = checkRole;