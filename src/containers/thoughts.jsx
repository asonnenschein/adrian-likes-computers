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
        ThoughtStore.getInitialState();
    },

    componentDidMount: function() {
        const self = this;
        ThoughtStore.addChangeListener('LOAD_THOUGHTS', function() {
            self.setState({thoughts: ThoughtStore.getThoughtIndex()});
        });
    },

    createThoughtComponent: function(thought) {
        return <ThoughtComponent key={thought.url_path} title={thought.title} url={thought.url_path} description={thought.description} created={thought.created} />;
    },

    createThoughtComponents: function(thoughts) {
        return thoughts.map(this.createThoughtComponent);
    },

    createThoughtsHeaderStyle: function() {
        return {
            fontFamily: "Coustard, serif",
            fontWeight: "900",
            fontSize: "40px",
            marginBottom: "30px"
        }
    },

    render: function() {
        if (typeof this.state.thoughts === "undefined") {
            return (<div></div>);
        }
        else {
            return (<div>
                <div style={this.createThoughtsHeaderStyle()} className="thoughts-header">thoughts.</div>
                <div className="thoughts-list">{this.createThoughtComponents(this.state.thoughts)}</div>
            </div>);
        }
    }

});