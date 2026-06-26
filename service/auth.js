const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function setUser(user) {
    return jwt.sign({ id: user._id, 
        email: user.email ,
        role: user.role,
    }, SECRET);
}

function getUser(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch {
        return null;
    }
}

module.exports = { setUser, getUser };
