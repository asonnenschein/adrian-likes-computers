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
                            const auth = data.generateJWT();
                            const user = data.serialize();
                            res.setHeader("Authorization", auth);
                            return res.status(200).json({user: user});
                        })
                        .catch(function(error) {
                            return res.status(500).json({error: error});
                        });
                })
                .catch(function(error) {
                    return res.status(500).json({error: error});
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
                    if (!data.validPassword(password)) {
                        return res.status(500).json({error: "Password is incorrect."});
                    }
                    const auth = data.generateJWT();
                    const user = data.serialize();
                    res.setHeader("Authorization", auth);
                    return res.status(200).json({user: user});
                })
                .catch(function(error) {
                    return res.status(500).json({error: error});
                });
        },

        getAuth: (req, res, next) => {
            const auth = req.query.auth;
            try {
                var decoded = jwt.verify(auth, process.env.JWT_SECRET);
            }
            catch (error) {
                return res.status(500).json({error: "getAuth() Failed: Could not verify auth."});
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
                        return res.status(500).json({error: "getAuth() Failed: Could not find user."});
                    }
                    const auth = data.generateJWT();
                    const user = data.serialize();
                    res.setHeader("Authorization", auth);
                    return res.status(200).json({user: user});
                })
                .catch(function(error) {
                    return res.status(500).json({error: error});
                });
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
            const title = req.body.title;
            const path = req.body.path;
            const description = req.body.description;
            const content = req.body.content;
            const userID = req.user.id;
            database.Tutorials
                .forge({})
        }
    }
};