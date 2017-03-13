require('bootstrap/dist/css/bootstrap.css');
require('highlight.js/styles/github.css');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const App = require('./containers/app.jsx');
const Thoughts = require('./containers/thoughts.jsx');
const Thought = require('./containers/thought.jsx');
const Work = require('./containers/work.jsx');
const About = require('./containers/about.jsx');
const Login = require('./containers/login.jsx');
const Register = require('./containers/register.jsx');
const User = require('./containers/user.jsx');
const Users = require('./containers/users.jsx');
const EditThought = require('./containers/editthought.jsx');
const EditAbout = require('./containers/editabout.jsx');


ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/login" component={Login} baseURL={process.env.BASE_URL} />
        <ReactRouter.Route path="/register" component={Register} baseURL={process.env.BASE_URL} />

        <ReactRouter.Route path="/users" component={Users} baseURL={process.env.BASE_URL}>
            <ReactRouter.Route path="/users/:user" component={User} />
            <ReactRouter.Route path="/users/:user/thoughts(/:thought)" component={EditThought} baseURL={process.env.BASE_URL} />
            <ReactRouter.Route path="/users/:user/about" component={EditAbout} baseURL={process.env.BASE_URL} />
        </ReactRouter.Route>

        <ReactRouter.Route path="/" component={App} baseURL={process.env.BASE_URL}>
            <ReactRouter.Route path="thoughts" component={Thoughts} />
            <ReactRouter.Route path="thoughts/:thought" component={Thought} />
            <ReactRouter.Route path="work" component={Work} />
            <ReactRouter.Route path="about" component={About} />
        </ReactRouter.Route>

        <ReactRouter.Redirect from="/*" to="/" />
    </ReactRouter.Router>,
    document.getElementById('adrian-likes-computers')
);