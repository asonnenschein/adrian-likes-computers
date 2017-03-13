const React = require('react');
const ReactRouter = require('react-router');
const ThoughtStore = require('./../../stores/thought.jsx');


module.exports = React.createClass({

    createThoughtStyle: function() {
        return {
            cursor: "pointer"
        }
    },

    createTitleStyle: function() {
        return {
            fontFamily: "Coustard, serif",
            marginBottom: "0px"
        }
    },

    createDescriptionStyle: function() {
        return {
            fontFamily: "Open Sans, sans-serif",
            fontSize: "16px"
        }
    },

    thoughtRedirect: function(event) {
        event.preventDefault();
        const path = this.props.url;
        ThoughtStore.getThought(path);
        ReactRouter.browserHistory.push(`/thoughts/${path}/`);
    },

    render: function() {
        return (<div style={this.createThoughtStyle()} className="thought-component" onClick={this.thoughtRedirect}>
            <h3 style={this.createTitleStyle()}>{this.props.title}</h3>
            <p style={this.createDescriptionStyle()}>{this.props.description}</p>
        </div>)
    }

});