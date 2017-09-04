const React = require('react');
const Navigation = require('./navigation.jsx');

module.exports = React.createClass({

    componentWillMount: function() {
        this.props.router.push('/thoughts');
    },

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