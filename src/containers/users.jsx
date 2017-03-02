const React = require('react');
const ReactRouter = require('react-router');
const AuthStore = require('./../stores/auth.jsx');


module.exports = React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Users"
        }
    },

    getInitialState: function() {
        return {
            authenticated: undefined
        };
    },

    componentWillMount: function() {
        const self = this;
        const lastCheck = AuthStore.getLastCheck();
        const elapsed = Date.now() + 1000;
        if (lastCheck > elapsed) {
            AuthStore.isAuthenticated().then(function(auth) {
                if (!auth) {
                    return ReactRouter.browserHistory.push('/login/');
                }
                return self.setState({authenticated: true});
            })
            .catch(function(error) {
                throw error;
            });
        }
    },

    redirectToThoughtEditor: function(event) {
        event.preventDefault();
        const username = AuthStore.getUser();
        ReactRouter.browserHistory.push(`/users/${username}/thoughts`);
    },

    redirectToAboutEditor: function(event) {
        event.preventDefault();
        const username = AuthStore.getUser();
        ReactRouter.browserHistory.push(`/users/${username}/about`);
    },

    redirectToAdminHome: function(event) {
        event.preventDefault();
        const username = AuthStore.getUser();
        ReactRouter.browserHistory.push(`/users/${username}/`);
    },

    render: function() {
        return (<div className="container">
            <div className="row">
                <button type="button" className="btn btn-success pull-right" onClick={this.redirectToAboutEditor}>Edit About</button>
                <button type="button" className="btn btn-success pull-right" onClick={this.redirectToThoughtEditor}>Create New Thought</button>
                <button type="button" className="btn btn-success pull-right" onClick={this.redirectToAdminHome}>Back to Admin</button>
            </div>
            <div>{ this.props.children }</div>
        </div>);
    }

});