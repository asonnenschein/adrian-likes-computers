const React = require('react');
const Image = require('./../capecod.jpg');


module.exports = React.createClass({

    createAboutHeaderStyle: function() {
        return {
            fontFamily: "Coustard, serif",
            fontWeight: "900",
            fontSize: "40px",
            marginBottom: "30px"
        }
    },

    render: function() {
        return (<div className="about">
            <div style={this.createAboutHeaderStyle()} className="about-header">about.</div>
            <img src={Image} role="presentation" className="img-responsive" />
            <p>
                Adrian Sonnenschein is a software developer and engineer based out of Phoenix, AZ.
            </p>
            <p>
                When he's not at a computer, he's probably playing a guitar, riding a bicycle, or getting
                lost in the mountains with his dog Huckleberry Finn.
            </p>
            <p>
                Contact him at <a href="mailto:adrian.sonnenschein@gmail.com">adrian.sonnenschein@gmail.com</a> if
                you'd like to pay him to do some work or convince him to contribute to your free and open
                source software (FOSS) project.
            </p>
        </div>);
    }

});