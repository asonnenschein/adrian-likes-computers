'use strict';


module.exports = (database, jwt, marked) => {
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
            const auth = req.headers.authorization;
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

        getAbout: (req, res, next) => {

        },

        getThoughts: (req, res, next) => {
            if (req.params.thoughts_path) {
                database.Tutorials
                    .forge({url_path: req.params.thoughts_path})
                    .fetch({columns: ['url_path', 'title', 'description', 'content_html', 'created_datetime']})
                    .then(function(data) {
                        return res.status(200).json({thought: data.toJSON()});
                    })
                    .catch(function(error) {
                        return res.status(500).json({error: error});
                    });
            }
            else {
                database.Tutorials
                    .forge()
                    .fetchAll({columns: ['tutorials_id', 'url_path', 'title', 'description', 'created_datetime']})
                    .then(function(data) {
                        return res.status(200).json({thoughts: data.models});
                    })
                    .catch(function(error) {
                        return res.status(500).json({error: error});
                    });
            }
        },

        postThought: (req, res, next) => {
            const title = req.body.title;
            const path = req.body.path;
            const description = req.body.description;
            const content = req.body.content;
            const userID = req.user.id;
            database.Tutorials
                .forge({
                    users_id: userID,
                    url_path: path,
                    title: title,
                    description: description,
                    content_markdown: content,
                    content_html: marked(content)
                })
                .save()
                .then(function(data) {
                    const auth = req.user.generateJWT();
                    const thought = data.serialize();
                    res.setHeader("Authorization", auth);
                    return res.status(200).json({thought: thought});
                })
                .catch(function(error) {
                    return res.status(500).json({error: error});
                });
        },

        postAbout: (req, res, next) => {

        }
    }
};