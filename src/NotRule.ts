import Rule from "./Rule";
import { isPromise } from "./util";

export default class NotRule extends Rule {
    execute(): boolean|Promise<boolean> {
        const rule = this.rules[0];
        if (!rule){
            return false;
        }
        const result = rule.execute();
        if (isPromise(result)){
            return Promise.resolve(result).then(res => !res);
        }
        return !rule.execute();
    }
}

Rule.not = function(rule1: Rule){
    const rule = new NotRule();
    rule.add(rule1);
    return rule;
};
