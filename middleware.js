'use strict';


module.exports = (database, jwt) => {
    return {
        requireAuthorization: (req, res, next) => {
            const auth = req.headers.authorization;
            try {
                var decoded = jwt.verify(auth, process.env.JWT_SECRET);
            }
            catch (error) {
                return res.status(500).json({error: "middleware.requireAuthorization() failed."});
            }
            const now = Date.now() / 1000;
            if (now > decoded.exp) {
                return res.redirect('/logout/');
            }
            database.Users
                .forge({users_id: decoded.users_id, username: decoded.username})
                .fetch()
                .then(function(data) {
                    if (!data) {
                        return res.status(401).json({error: "middleware.requireAuthorization() Failed: Could not find user."});
                    }
                    req.user = data;
                    return next();
                })
                .catch(function(error) {
                    return res.status(500).json({error: error});
                });
        }
    }
};