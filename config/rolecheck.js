module.exports = function (options) {
    return function (request, response, next) {
        try {
            if (options.includes(request.session.RoleID)) {
                return next();
            } else {
                return response.redirect('/dashboard');
            }
        } catch (ex) {
            response.status(401).json({ status: false, message: 'Authorization failed', data: [] });
        }
    }
}

