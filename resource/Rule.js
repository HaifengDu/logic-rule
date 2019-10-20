import { isPromise } from "./util";
var Rule = (function () {
    function Rule(operator) {
        this.rules = [];
        if (typeof operator === "function") {
            this.checkCb = Rule.getCheckCb(operator);
        }
    }
    Rule.getCheckCb = function (operator) {
        return typeof operator === "function" ? operator : function () { return isPromise(operator) ? operator : !!operator; };
    };
    Rule.only = function (cb) {
        throw new Error("only(" + cb + ") method is not implemented");
    };
    Rule.and = function (rule1, rule2) {
        throw new Error("and(" + rule1 + "," + rule2 + ") method is not implemented");
    };
    Rule.not = function (rule1) {
        throw new Error("not(" + rule1 + ") method is not implemented");
    };
    Rule.or = function (rule1, rule2) {
        throw new Error("or(" + rule1 + ", " + rule2 + ") method is not implemented");
    };
    Rule.prototype.add = function (rule) {
        this.rules.push(rule);
    };
    Rule.prototype.and = function (rule) {
        if (!rule) {
            return this;
        }
        return Rule.and(this, rule);
    };
    Rule.prototype.or = function (rule) {
        if (!rule) {
            return this;
        }
        return Rule.or(this, rule);
    };
    Rule.prototype.not = function () {
        return Rule.not(this);
    };
    return Rule;
}());
export { Rule };
export default Rule;
