"use strict";
var assert = require('assert');
const sumService = require("../../app/services/sum");

describe("sum service tests", ()=> {
    it("should return 5", ()=> {
        let number1 = 2;
        let number2 = 3;

        let result = sumService.sum(number1, number2);

        assert.equal(5, result);
    });
});