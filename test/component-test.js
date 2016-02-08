require('./dom-mock')('<html><body></body></html>');
var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var proxyquire = require('proxyquire');

describe('Testing my div', function () {
    jsdom({skipWindowCheck: true});
    var stub = {};
    beforeEach(()=> {
        stub = {};
        stub["../services/sum"] = {
            "sum": function () {
                return 77;
            }
        };
        stub["../services/divide"] = {
            default: function () {
                return 12;
            }
        };
    });

    it('should return 77 before', function () {
        let component = proxyquire("../app/components/component.jsx", stub);

        var VeryFirstDiv = component;

        var myDiv = TestUtils.renderIntoDocument(
            <VeryFirstDiv />
        );

        var divText = TestUtils.findRenderedDOMComponentWithTag(
            myDiv, 'span');

        assert.equal(divText.textContent, 'Lovely! Here it is - my very first React component! 77 12');
    });

    it('should return 99', function () {
        stub["../services/sum"] = {
            "sum": function () {
                return 99;
            }
        };

        let component = proxyquire("../app/components/component.jsx", stub);

        var VeryFirstDiv = component;

        var myDiv = TestUtils.renderIntoDocument(
            <VeryFirstDiv />
        );
        var divText = TestUtils.findRenderedDOMComponentWithTag(
            myDiv, 'span');

        assert.equal(divText.textContent, 'Lovely! Here it is - my very first React component! 99 12');
    });

    it('should return 77 after', function () {
        let component = proxyquire("../app/components/component.jsx", stub);

        var VeryFirstDiv = component;

        var myDiv = TestUtils.renderIntoDocument(
            <VeryFirstDiv />
        );

        var divText = TestUtils.findRenderedDOMComponentWithTag(
            myDiv, 'span');

        assert.equal(divText.textContent, 'Lovely! Here it is - my very first React component! 77 12');
    });
});