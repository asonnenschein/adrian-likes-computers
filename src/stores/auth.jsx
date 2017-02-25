const AppDispatcher = require('./../dispatchers/app.jsx');
const AuthConstants = require('./../constants/auth.jsx');
const EventEmitter = require('events');
const request = require('superagent/lib/client');
//const AuthActions = require('./../actions/auth.jsx');


const CHANGE_EVENT = 'change';


function setUser(user, token) {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }
}

function removeUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

const AuthStoreObj = Object.assign(Object.create(EventEmitter.prototype), {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
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
        return localStorage.getItem('user');
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
                        throw error;
                    }
                    console.log(response);
                });
        }
    }
});

const AuthStore = Object.create(AuthStoreObj);

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
    switch (payload.actionType) {
        case AuthConstants.LOGIN_USER:
            setUser(payload.user, payload.token);
            AuthStore.emitChange();
            break;
        case AuthConstants.LOGOUT_USER:
            removeUser();
            AuthStore.emitChange();
            break;
        default:
            break;
    }
});

AuthStore.getInitialState();


module.exports = AuthStore;