import Rule from "./Rule";
import { isPromise } from "./util";

export default class AndRule extends Rule {
    execute(): boolean|Promise<boolean> {
        const rule1 = this.rules[0];
        const rule2 = this.rules[1];
        if (!rule1 || !rule2){
            throw new Error("The rule cannot be empty");
        }
        const ruleResult1 = rule1.execute();
        const ruleResult2 = rule2.execute();
        if (isPromise(ruleResult1) || isPromise(ruleResult2)) {
            return Promise.all([ruleResult1, ruleResult2]).then(result => result[0] && result[1]);
        }
        return rule1.execute() && rule2.execute();
    }
}

Rule.and = function(rule1: Rule, rule2: Rule){
    const rule = new AndRule();
    rule.add(rule1);
    rule.add(rule2);
    return rule;
};
