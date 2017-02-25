const React = require('react');
const ReactRouter = require('react-router');
const request = require('superagent/lib/client');
const AuthActions = require('./../actions/auth.jsx');
const AuthStore = require('./../stores/auth.jsx');


module.exports = React.createClass({

    action: null,
    state: {
        authenticated: AuthStore.isAuthenticated()
    },

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Login"
        }
    },

    componentWillMount: function() {
        this.action = `${this.props.route.baseURL}/login/`;
    },

    processForm: function(event) {
        const self = this;
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
                AuthActions.logUserIn(response.body.user, response.body.token);
                self.setState({authenticated: AuthStore.isAuthenticated()});
                ReactRouter.browserHistory.push(`/users/${response.body.user.username}/`);
            });
    },

    render: function() {
        return (<div className="container">
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