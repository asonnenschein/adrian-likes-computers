const React = require('react');
const request = require('superagent/lib/client');
const AuthStore = require('./../stores/auth.jsx');


module.exports = React.createClass({

    action: null,

    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: "Edit About"
        }
    },

    componentDidMount: function() {
        this.action = `${this.props.route.baseURL}/about/`;
    },

    processForm: function(event) {
        event.preventDefault();
        request.post(this.action)
            .type('form')
            .send({content: this.refs.content.value})
            .set('Accept', 'application/json')
            .set('Authorization', AuthStore.getJWT())
            .end(function(error, response) {
                if (error) {
                    throw error;
                }
                console.log(response);
                console.log(response);
            });
    },

    render: function() {
        return (<div id="edit-thought">
            <div className="row">
                <h3>Edit About</h3>
            </div>
            <div className="row">
                <form onSubmit={this.processForm}>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" ref="content" rows="16" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>);
    }

});