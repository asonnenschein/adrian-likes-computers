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

                })
                .catch(function(error) {

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