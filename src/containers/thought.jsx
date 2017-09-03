const React = require('react');
const ThoughtStore = require('./../stores/thought.jsx');


module.exports = React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Thought"
        }
    },

    getInitialState: function() {
        return {
            thought: undefined
        }
    },

    componentWillMount: function() {
        const thoughtsIndex = ThoughtStore.getThoughtIndex();
        if (!thoughtsIndex || typeof this.state.thought === "undefined") {
            ThoughtStore.getThought(this.props.params.thought);
        }
    },

    componentDidMount: function() {
        const self = this;
        ThoughtStore.addChangeListener('LOAD_THOUGHT', function() {
            if (typeof self.state.thought === "undefined") {
                self.setState({thought: ThoughtStore.getActiveThought()});
            }
        });
    },

    createMarkup: function() {
        return {__html: this.state.thought.content_html};
    },

    createTitleStyle: function() {
        return {
            fontFamily: "Coustard, serif",
            fontWeight: "900",
            fontSize: "40px",
            marginBottom: "30px"
        }
    },

    render: function() {
        if (typeof this.state.thought === "undefined") {
            return (<div></div>);
        }
        else {
            return(<div className="thought">
                <div style={this.createTitleStyle()} className="thoughts-header">{this.state.thought.title}.</div>
                <div dangerouslySetInnerHTML={this.createMarkup()}/>
            </div>);
        }
    }

});