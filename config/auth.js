const jwt = require('jsonwebtoken');
module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        request.userData = decoded;
        next();
    } catch (ex) {
        response.status(401).json({ status: false, message: 'Authorization failed', data: [] });
    }
}
