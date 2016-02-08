import {sum} from '../services/sum';
import divide from '../services/divide';
var React = require('react');
//var sum = require('../services/sum');
//var divide = require('../services/divide');

var VeryFirstDiv = React.createClass({
    render() {
        return (
            <div className="veryFirstDiv">
                <span>Lovely! Here it is - my very first React component! {sum(4, 5)} {divide(10, 2)}</span>
            </div>
        );
    }
});

module.exports = VeryFirstDiv;