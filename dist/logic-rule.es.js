var Rule = (function () {
    function Rule(operator) {
        this.rules = [];
        if (typeof operator === "function") {
            this.checkCb = Rule.getCheckCb(operator);
        }
    }
    Rule.getCheckCb = function (operator) {
        return typeof operator === "function" ? operator : function () { return !!operator; };
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

var isPromise = function (obj) { return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function"; };

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AndRule = (function (_super) {
    __extends(AndRule, _super);
    function AndRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AndRule.prototype.execute = function () {
        var rule1 = this.rules[0];
        var rule2 = this.rules[1];
        if (!rule1 || !rule2) {
            throw new Error("The rule cannot be empty");
        }
        var ruleResult1 = rule1.execute();
        var ruleResult2 = rule2.execute();
        if (isPromise(ruleResult1) || isPromise(ruleResult2)) {
            return Promise.all([ruleResult1, ruleResult2]).then(function (result) { return result[0] && result[1]; });
        }
        return rule1.execute() && rule2.execute();
    };
    return AndRule;
}(Rule));
Rule.and = function (rule1, rule2) {
    var rule = new AndRule();
    rule.add(rule1);
    rule.add(rule2);
    return rule;
};

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NotRule = (function (_super) {
    __extends$1(NotRule, _super);
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
Rule.not = function (rule1) {
    var rule = new NotRule();
    rule.add(rule1);
    return rule;
};

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OnlyRule = (function (_super) {
    __extends$2(OnlyRule, _super);
    function OnlyRule(checkCb) {
        return _super.call(this, checkCb) || this;
    }
    OnlyRule.prototype.execute = function () {
        return this.checkCb();
    };
    return OnlyRule;
}(Rule));
Rule.only = function (cb) {
    return new OnlyRule(this.getCheckCb(cb));
};

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OrRule = (function (_super) {
    __extends$3(OrRule, _super);
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
Rule.or = function (rule1, rule2) {
    var rule = new OrRule();
    rule.add(rule1);
    rule.add(rule2);
    return rule;
};

require("./lib/promise.auto.js");
var index = {
    Rule: Rule,
    AndRule: AndRule,
    OrRule: OrRule,
    NotRule: NotRule,
    OnlyRule: OnlyRule,
};

export default index;
export { Rule, AndRule, OrRule, NotRule, OnlyRule };
