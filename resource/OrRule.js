var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Rule from "./Rule";
import { isPromise } from "./util";
var OrRule = (function (_super) {
    __extends(OrRule, _super);
    function OrRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrRule.prototype.execute = function () {
        var rule1 = this.rules[0];
        var rule2 = this.rules[1];
        if (!rule1 || !rule2) {
            throw new Error("The rule cannot be empty");
        }
        var ruleResult1 = rule1.execute();
        var ruleResult2 = rule2.execute();
        if (isPromise(ruleResult1) || isPromise(ruleResult2)) {
            return Promise.all([ruleResult1, ruleResult2]).then(function (result) { return result[0] || result[1]; });
        }
        return rule1.execute() || rule2.execute();
    };
    return OrRule;
}(Rule));
export default OrRule;
Rule.or = function (rule1, rule2) {
    var rule = new OrRule();
    rule.add(rule1);
    rule.add(rule2);
    return rule;
};
