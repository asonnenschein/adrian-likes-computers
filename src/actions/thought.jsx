const AppDispatcher = require('./../dispatchers/app.jsx');
const ThoughtConstants = require('./../constants/thought.jsx');


module.exports = {
    loadThoughts: function() {
        AppDispatcher.dispatch({
            actionType: ThoughtConstants.LOAD_THOUGHTS
        });
    },
    loadThought: function(thought) {
        AppDispatcher.dispatch({
            actionType: ThoughtConstants.LOAD_THOUGHT,
            thought: thought
        });
    }
}