const React = require('react');
const Navigation = require('./navigation.jsx');

module.exports = React.createClass({

    createWidthStyle: function() {
        return {
            maxWidth: "970px"
        }
    },

    render: function() {
        return (<div>
            <Navigation />
            <div className="container" style={this.createWidthStyle()}>
                <div>{ this.props.children }</div>
            </div>
        </div>);
    }

});