import Rule from "./Rule";
export default class OrRule extends Rule {
    execute(): boolean | Promise<boolean>;
}
