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
var NotRule = (function (_super) {
    __extends(NotRule, _super);
    function NotRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotRule.prototype.execute = function () {
        var rule = this.rules[0];
        if (!rule) {
            return false;
        }
        var result = rule.execute();
        if (isPromise(result)) {
            return Promise.resolve(result).then(function (res) { return !res; });
        }
        return !rule.execute();
    };
    return NotRule;
}(Rule));
export default NotRule;
Rule.not = function (rule1) {
    var rule = new NotRule();
    rule.add(rule1);
    return rule;
};
