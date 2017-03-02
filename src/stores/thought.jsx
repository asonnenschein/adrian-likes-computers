const AppDispatcher = require('./../dispatchers/app.jsx');
const ThoughtConstants = require('./../constants/thought.jsx');
//const ThoughtActions = require('./../actions/thought.jsx');
//const ReactRouter = require('react-router');
const EventEmitter = require('events');
const request = require('superagent/lib/client');


const LOAD_THOUGHTS_EVENT = 'LOAD_THOUGHTS';
const LOAD_THOUGHT_EVENT = 'LOAD_THOUGHT';


const ThoughtStoreObj = Object.assign(Object.create(EventEmitter.prototype), {
    thoughtIndex: null,
    activeThought: null,
    emitChange: function(event) {
        this.emit(event);
    },
    addChangeListener: function(event, callback) {
        this.on(event, callback);
    },
    removeChangeListener: function(event, callback) {
        this.removeListener(event, callback);
    },
    getThoughtIndex: function() {
        return this.thoughtIndex;
    },
    getThought: function(thought) {

    },
    getInitialState: function() {
        const self = this;
        const thoughtURL = `${process.env.BASE_URL}/thoughts/`
        request.get(thoughtURL)
            .end(function(error, response) {
                if (error) {
                    throw error;
                }
                self.thoughtIndex = response.body.thoughts;
            });
    }
});

const ThoughtStore = Object.create(ThoughtStoreObj);

ThoughtStore.dispatch = AppDispatcher.register(function(payload) {
    switch (payload.actionType) {
        case ThoughtConstants.LOAD_THOUGHTS:
            ThoughtStore.emitChange(LOAD_THOUGHTS_EVENT);
            break;
        case ThoughtConstants.LOAD_THOUGHT:
            ThoughtStore.emitChange(LOAD_THOUGHT_EVENT);
            break;
        default:
            break;
    }
});

module.exports = ThoughtStore;