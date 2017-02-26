const AppDispatcher = require('./../dispatchers/app.jsx');
const AuthConstants = require('./../constants/auth.jsx');
const AuthActions = require('./../actions/auth.jsx');
const ReactRouter = require('react-router');
const EventEmitter = require('events');
const request = require('superagent/lib/client');


const LOGIN_EVENT = 'LOGIN';
const LOGOUT_EVENT = 'LOGOUT';


function setUser(username, token) {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    }
}

function removeUser() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
}

const AuthStoreObj = Object.assign(Object.create(EventEmitter.prototype), {
    emitChange: function(event) {
        this.emit(event);
    },
    addChangeListener: function(event, callback) {
        this.on(event, callback);
    },
    removeChangeListener: function(event, callback) {
        this.removeListener(event, callback);
    },
    isAuthenticated: function() {
        if (localStorage.getItem('token')) {
            return true;
        }
        else {
            return false;
        }
    },
    getUser: function() {
        return localStorage.getItem('username');
    },
    getJWT: function() {
        return localStorage.getItem('token');
    },
    getInitialState: function() {
        if (this.isAuthenticated()) {
            const authURL = `${process.env.BASE_URL}/auth/`;
            request.get(authURL)
                .query({auth: this.getJWT()})
                .end(function(error, response) {
                    if (error) {
                        ReactRouter.browserHistory.push('/login/');
                        throw error;
                    }
                    const username = response.body.user.username;
                    const auth = response.headers.authorization;
                    AuthActions.logUserIn(username, auth);
                });
        }
        else {
            ReactRouter.browserHistory.push('/login/');
        }
    }
});

const AuthStore = Object.create(AuthStoreObj);

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
    switch (payload.actionType) {
        case AuthConstants.LOGIN_USER:
            setUser(payload.user, payload.token);
            AuthStore.emitChange(LOGIN_EVENT);
            break;
        case AuthConstants.LOGOUT_USER:
            removeUser();
            AuthStore.emitChange(LOGOUT_EVENT);
            break;
        default:
            break;
    }
});

AuthStore.getInitialState();


module.exports = AuthStore;