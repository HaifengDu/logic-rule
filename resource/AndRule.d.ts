import Rule from "./Rule";
export default class AndRule extends Rule {
    execute(): boolean | Promise<boolean>;
}
