import { INoop } from "./interface/INoop";
import Rule from "./Rule";

export default class OnlyRule extends Rule {
    constructor(checkCb: INoop){
        super(checkCb);
    }

    execute(): boolean|Promise<boolean> {
        return this.checkCb();
    }
}

Rule.only = function(cb: INoop|boolean){
    return new OnlyRule(this.getCheckCb(cb));
};
