import { INoop } from "./interface/INoop";
import Rule from "./Rule";
export default class OnlyRule extends Rule {
    constructor(checkCb: INoop);
    execute(): boolean | Promise<boolean>;
}
