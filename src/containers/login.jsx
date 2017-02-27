const React = require('react');
const ReactRouter = require('react-router');
const request = require('superagent/lib/client');
const AuthActions = require('./../actions/auth.jsx');
const AuthStore = require('./../stores/auth.jsx');


module.exports = React.createClass({

    action: null,

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Login"
        }
    },

    getInitialState: function() {
        return {authenticated: AuthStore.isAuthenticated()};
    },

    componentWillMount: function() {
        AuthStore.getInitialState()
        AuthStore.addChangeListener('LOGIN', function() {
            const username = AuthStore.getUser();
            return ReactRouter.browserHistory.push(`/users/${username}`);
        });
        this.action = `${this.props.route.baseURL}/login/`;
    },

    processForm: function(event) {
        event.preventDefault();
        request.post(this.action)
            .type('form')
            .send({username: this.refs.username.value})
            .send({password: this.refs.password.value})
            .set('Accept', 'application/json')
            .end(function(error, response) {
                if (error) {
                    throw error;
                }
                const username = response.body.user.username;
                const auth = response.headers.authorization;
                AuthActions.logUserIn(username, auth);
                ReactRouter.browserHistory.push(`/users/${username}/`);
            });
    },

    render: function() {
        return (<div>
            <div className="row">
                <div className="col-md-4"></div>
                <form className="col-md-4" onSubmit={this.processForm}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" ref="username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" ref="password" placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
                </form>
                <div className="col-md-4"></div>
            </div>
        </div>);
    }

});