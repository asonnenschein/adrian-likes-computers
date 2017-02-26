const React = require('react');
const AuthStore = require('./../stores/auth.jsx');


module.exports = React.createClass({

    componentWillMount: function() {
        AuthStore.getInitialState()
    },

    render: function() {
        return (<div></div>);
    }

});