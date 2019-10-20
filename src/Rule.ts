import { INoop } from "./interface/INoop";
import { isPromise } from "./util";

export abstract class Rule{
    protected checkCb: INoop;
    protected rules: Array<Rule> = [];

    private static getCheckCb(operator){
        return typeof operator === "function" ? operator : () => isPromise(operator) ? operator : !!operator;
    }

    static only(cb: INoop|boolean|Promise<boolean>): Rule{
        throw new Error(`only(${cb}) method is not implemented`);
    }

    static and(rule1: Rule, rule2: Rule): Rule{
        throw new Error(`and(${rule1},${rule2}) method is not implemented`);
    }

    static not(rule1: Rule): Rule{
        throw new Error(`not(${rule1}) method is not implemented`);
    }

    static or(rule1: Rule, rule2: Rule): Rule{
        throw new Error(`or(${rule1}, ${rule2}) method is not implemented`);
    }

    abstract execute(): boolean|Promise<boolean>;

    constructor(operator?: INoop){
        if (typeof operator === "function"){
            this.checkCb = Rule.getCheckCb(operator);
        }
    }

    add(rule: Rule) {
        this.rules.push(rule);
    }

    and(rule: Rule) {
        if (!rule){
            return this;
        }
        return Rule.and(this, rule);
    }

    or(rule: Rule) {
        if (!rule){
            return this;
        }
        return Rule.or(this, rule);
    }

    not() {
        return Rule.not(this);
    }
}

export default Rule;
