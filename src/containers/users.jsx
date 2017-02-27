const React = require('react');
const AuthStore = require('./../stores/auth.jsx');


module.exports = React.createClass({

    componentWillMount: function() {
        AuthStore.getInitialState()
    },

    render: function() {
        return (<div className="container">
            <div>{ this.props.children }</div>
        </div>);
    }

});