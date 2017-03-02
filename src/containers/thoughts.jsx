const React = require('react');
const ThoughtStore = require('./../stores/thought.jsx');

module.exports = React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Thoughts"
        }
    },

//    getInitialState: function() {

//    },

    componentWillMount: function() {
        ThoughtStore.getInitialState();
    },


    render: function() {
        return (<div></div>);
    }

});