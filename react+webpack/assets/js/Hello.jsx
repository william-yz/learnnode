/**
 * Created by yangwi on 1/5/2016.
 */
'use strict'
var React = require('react');
class Hello extends React.Component {
    render() {
        return (
            <h1>Hello {this.props.name}!</h1>
        );
    }
}