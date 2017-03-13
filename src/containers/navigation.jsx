const React = require('react');
const NavigationThoughts = require('./../components/navigation/thoughts.jsx');
const NavigationWork = require('./../components/navigation/work.jsx');
const NavigationAbout = require('./../components/navigation/about.jsx');
const NavigationCode = require('./../components/navigation/code.jsx');


module.exports = React.createClass({

    createNavbarStyle: function() {
        return {
            backgroundColor: "transparent",
            borderColor: "transparent",
        }
    },

    createContainerStyle: function() {
        return {
            maxWidth: "970px"
        }
    },

    createNavbarListStyle: function() {
        return {
            fontFamily: "Open Sans, sans-serif",
            paddingTop: "15px",
            marginTop: "10px",
            marginRight: "-6px"
        }
    },

    render: function() {
        return (<div>
            <nav className="navbar navbar-default" style={this.createNavbarStyle()}>
                <div className="container" style={this.createContainerStyle()}>
                    <ul className="list-inline pull-right" style={this.createNavbarListStyle()}>
                        <NavigationThoughts />
                        <NavigationWork />
                        <NavigationCode />
                        <NavigationAbout />
                    </ul>
                </div>
            </nav>
        </div>);
    }

});