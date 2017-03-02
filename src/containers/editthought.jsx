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
            name: "Edit Thought"
        }
    },

    componentDidMount: function() {
        this.action = `${this.props.route.baseURL}/thoughts/`;
    },

    processForm: function(event) {
        event.preventDefault();
        request.post(this.action)
            .type('form')
            .send({title: this.refs.title.value})
            .send({path: this.refs.path.value})
            .send({description: this.refs.description.value})
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
                <h3>Create or Update Thought</h3>
            </div>
            <div className="row">
                <form onSubmit={this.processForm}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" ref="title" placeholder="Title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="path">URL Path</label>
                        <input type="text" className="form-control" id="path" ref="path" placeholder="Path" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" ref="description" rows="3" required></textarea>
                    </div>
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