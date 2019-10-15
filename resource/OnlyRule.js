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
var OnlyRule = (function (_super) {
    __extends(OnlyRule, _super);
    function OnlyRule(checkCb) {
        return _super.call(this, checkCb) || this;
    }
    OnlyRule.prototype.execute = function () {
        return this.checkCb();
    };
    return OnlyRule;
}(Rule));
export default OnlyRule;
Rule.only = function (cb) {
    return new OnlyRule(this.getCheckCb(cb));
};
