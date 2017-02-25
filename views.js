'use strict';


module.exports = (database, jwt) => {
    return {
        postRegister: (req, res, next) => {
            const username = req.body.username;
            const password = req.body.password;
            database.Users
                .forge({username: username})
                .fetch()
                .then(function(user) {
                    if (user) {
                        return res.status(500).json({error: "Username is taken."});
                    }
                    database.Users
                        .forge({username: username, password: password})
                        .save()
                        .then(function(data) {
                            return res.status(200).json({
                                token: data.generateJWT(),
                                user: data.serialize()
                            });
                        })
                        .catch(function(error) {
                            return res.status(500).json({
                                error: error
                            });
                        });
                })
                .catch(function(error) {
                    return res.status(500).json({
                        error: error
                    });
                });
        },

        postLogin: (req, res, next) => {
            const username = req.body.username;
            const password = req.body.password;
            database.Users
                .forge({username: username})
                .fetch()
                .then(function(data) {
                    if (!data) {
                        return res.status(500).json({error: "User does not exist."});
                    }
                    else if (!data.validPassword(password)) {
                        return res.status(500).json({error: "Password is incorrect."});
                    }
                    else {
                        return res.status(200).json({
                            token: data.generateJWT(),
                            user: data.serialize()
                        });
                    }
                })
                .catch(function(error) {
                    return res.status(500).json({
                        error: error
                    });
                });
        },

        getLogout: (req, res, next) => {

        },

        getAuth: (req, res, next) => {
            const auth = req.query.auth;
            const decoded = jwt.verify(auth, process.env.JWT_SECRET);
            console.log(Date.now());
        },

        getUser: (req, res, next) => {

        },

        getWork: (req, res, next) => {

        },

        getAbout: (req, res, next) => {

        },

        getThoughts: (req, res, next) => {

        },

        postThought: (req, res, next) => {

        }
    }
};