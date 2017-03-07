const React = require('react');


module.exports = React.createClass({

    render: function() {
        return (<div>
            <h4>{this.props.title}</h4>
            <p>{this.props.description}</p>
        </div>)
    }

});