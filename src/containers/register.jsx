const React = require('react');


module.exports = React.createClass({

    render: function() {
        return (<div>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>);
    }

});