require('bootstrap/dist/css/bootstrap.css');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Thoughts = require('./containers/thoughts.jsx');


ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={Thoughts} />
    </ReactRouter.Router>,
    document.getElementById('adrian-likes-computers')
);