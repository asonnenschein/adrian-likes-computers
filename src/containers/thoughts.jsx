const React = require('react');
const ThoughtStore = require('./../stores/thought.jsx');
const ThoughtComponent = require('./../components/thoughts/thought.jsx');


module.exports = React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Thoughts"
        }
    },

    getInitialState: function() {
        return {
            thoughts: undefined
        }
    },

    componentWillMount: function() {
        const self = this;
        ThoughtStore.getInitialState();
        ThoughtStore.addChangeListener('LOAD_THOUGHTS', function() {
            self.setState({thoughts: ThoughtStore.getThoughtIndex()});
        });
    },

    createThoughtComponent: function(thought) {
        return <ThoughtComponent title={thought.title} url={thought.url_path} description={thought.description} created={thought.created} />;
    },

    createThoughtComponents: function(thoughts) {
        return thoughts.map(this.createThoughtComponent);
    },

    render: function() {
        if (typeof this.state.thoughts === "undefined") {
            return (<div></div>);
        }
        else {
            return (<div>{this.createThoughtComponents(this.state.thoughts)}</div>);
        }
    }

});