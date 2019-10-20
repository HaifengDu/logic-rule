import { INoop } from "./interface/INoop";
export declare abstract class Rule {
    protected checkCb: INoop;
    protected rules: Array<Rule>;
    private static getCheckCb;
    static only(cb: INoop | boolean | Promise<boolean>): Rule;
    static and(rule1: Rule, rule2: Rule): Rule;
    static not(rule1: Rule): Rule;
    static or(rule1: Rule, rule2: Rule): Rule;
    abstract execute(): boolean | Promise<boolean>;
    constructor(operator?: INoop);
    add(rule: Rule): void;
    and(rule: Rule): Rule;
    or(rule: Rule): Rule;
    not(): Rule;
}
export default Rule;
