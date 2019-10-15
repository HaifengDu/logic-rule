import Rule from "./Rule";
export default class NotRule extends Rule {
    execute(): boolean | Promise<boolean>;
}
