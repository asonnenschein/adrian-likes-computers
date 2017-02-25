'use strict';


module.exports = (database, jwt) => {
    return {
        postRegister: (req, res, next) => {
            const username = req.body.username;
            const password = req.body.password;
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
        },

        getAuth: (req, res, next) => {

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