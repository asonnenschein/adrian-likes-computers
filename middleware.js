'use strict';


module.exports = (database, jwt) => {
    return {
        requireAuthorization: (req, res, next) => {
            console.log(req);
        }
    }
};