const React = require('react');


module.exports = React.createClass({

    createItemStyle: function() {
        return {
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingRight: "6px",
            paddingLeft: "6px",
            fontSize: "16px",
            color: "#000"
        }
    },

    render: function() {
        return (<li><a style={this.createItemStyle()} href="http://www.linkedin.com/in/adrian-sonnenschein-a09ab0134">Work</a></li>);
    }

});