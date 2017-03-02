const AppDispatcher = require('./../dispatchers/app.jsx');
const AuthConstants = require('./../constants/auth.jsx');
const ReactRouter = require('react-router');
const EventEmitter = require('events');
const request = require('superagent/lib/client');
const bPromise = require('bluebird');

const LOGIN_EVENT = 'LOGIN';
const LOGOUT_EVENT = 'LOGOUT';

function setUser(username, token) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('lastCheck', Date.now());
}

function removeUser() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.setItem('lastCheck');
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
    hasAuthentication: function() {
        if (localStorage.getItem('token')) {
            return true;
        }
        else {
            return false;
        }
    },
    isAuthenticated: function() {
        const self = this;
        return new bPromise(function(resolve, reject) {
            if (!self.hasAuthentication()) {
                resolve(false);
            }
            const token = self.getJWT();
            const authURL = `${process.env.BASE_URL}/auth/`;
            request.get(authURL)
                .set('Authorization', token)
                .end(function(error, response) {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                });
        });
    },
    getUser: function() {
        return localStorage.getItem('username');
    },
    getJWT: function() {
        return localStorage.getItem('token');
    },
    getLastCheck: function() {
        return localStorage.getItem('lastCheck');
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

AuthStore.addChangeListener('LOGIN', function() {
    const username = AuthStore.getUser();
    ReactRouter.browserHistory.push(`/users/${username}/`);
});

module.exports = AuthStore;