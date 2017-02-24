const React = require('react');


module.exports = React.createClass({

    action: null,

    componentWillMount: function() {
        this.action = `${this.props.route.baseURL}/register/`;
    },

    render: function() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <form className="col-md-4" method="POST" action={this.action}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <div className="col-md-4"></div>
            </div>
        </div>);
    }

});