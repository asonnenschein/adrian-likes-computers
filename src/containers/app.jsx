const React = require('react');
const Navigation = require('./navigation.jsx');


module.exports = React.createClass({

    render: function() {
        return (<div>
            <Navigation />
            <div>{ this.props.children }</div>
        </div>);
    }

});