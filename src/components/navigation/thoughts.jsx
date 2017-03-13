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
        return (<li><a style={this.createItemStyle()} href="/thoughts">Thoughts</a></li>);
    }

});