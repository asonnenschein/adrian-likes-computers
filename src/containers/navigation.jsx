const React = require('react');
const NavigationBrand = require('./../components/navigation/brand.jsx');
const NavigationThoughts = require('./../components/navigation/thoughts.jsx');
const NavigationWork = require('./../components/navigation/work.jsx');
const NavigationAbout = require('./../components/navigation/about.jsx');


module.exports = React.createClass({

    render: function() {
        return (<div>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <NavigationBrand />
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <NavigationThoughts />
                            <NavigationWork />
                            <NavigationAbout />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>);
    }

});