const AppDispatcher = require('./../dispatchers/app.jsx');
const AuthConstants = require('./../constants/auth.jsx');


module.exports = {
    logUserIn: function(user, token) {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGIN_USER,
            user: user,
            token: token
        })
    },
    logUserOut: function() {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGOUT_USER
        })
    }
};