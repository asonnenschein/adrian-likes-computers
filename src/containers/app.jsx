const React = require('react');
const Navigation = require('./navigation.jsx');

module.exports = React.createClass({

    render: function() {
        return (<div>
            <Navigation />
            <div className="container">
                <div>{ this.props.children }</div>
            </div>
        </div>);
    }

});