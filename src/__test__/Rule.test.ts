import "../AndRule";
import "../NotRule";
import OnlyRule from "../OnlyRule";
import "../OrRule";
import Rule from "../Rule";

describe("Logic Rule test", () => {
    it("should create rule correctly", () => {
        const onlyRule = Rule.only(() => true);
        expect(onlyRule.execute()).toBe(true);
        const onlyRule2 = new OnlyRule(() => false);
        expect(onlyRule2.execute()).toBe(false);
        const onlyRule3 = Rule.only(false);
        expect(onlyRule3.execute()).toBe(false);

        const andRule = Rule.and(null, null);
        expect(() => andRule.execute()).toThrow();
        const andRule2 = Rule.and(onlyRule, null);
        expect(() => andRule2.execute()).toThrow();
        const andRule3 = Rule.and(null, onlyRule);
        expect(() => andRule3.execute()).toThrow();
        const andRule4 = Rule.and(onlyRule, onlyRule2);
        expect(andRule4.execute()).toBe(false);

        const orRule = Rule.or(null, null);
        expect(() => orRule.execute()).toThrow();
        const orRule2 = Rule.or(onlyRule, null);
        expect(() => orRule2.execute()).toThrow();
        const orRule3 = Rule.or(null, onlyRule);
        expect(() => orRule3.execute()).toThrow();
        const orRule4 = Rule.or(onlyRule, onlyRule2);
        expect(orRule4.execute()).toBe(true);

        const notRule = Rule.not(null);
        expect(notRule.execute()).toBe(false);
        const notRule2 = Rule.not(onlyRule);
        expect(notRule2.execute()).toBe(false);
    });

    it("should and rule correctly", () => {
        const onlyRule = Rule.only(() => true);
        const onlyRule2 = Rule.only(() => false);
        const andRule4 = Rule.and(onlyRule, onlyRule2);
        expect(andRule4.execute()).toBe(false);
        const andRule5 = Rule.and(onlyRule, onlyRule);
        expect(andRule5.execute()).toBe(true);
        const andRule6 = Rule.and(onlyRule2, onlyRule2);
        expect(andRule6.execute()).toBe(false);
    });

    it("should or rule correctly", () => {
        const onlyRule = Rule.only(() => true);
        const onlyRule2 = Rule.only(() => false);
        const orRule4 = Rule.or(onlyRule, onlyRule2);
        expect(orRule4.execute()).toBe(true);
        const orRule5 = Rule.or(onlyRule, onlyRule);
        expect(orRule5.execute()).toBe(true);
        const orRule6 = Rule.or(onlyRule2, onlyRule2);
        expect(orRule6.execute()).toBe(false);
    });

    it("should not rule correctly", () => {
        const onlyRule = Rule.only(() => true);
        const onlyRule2 = Rule.only(() => false);
        const notRule4 = Rule.not(onlyRule);
        expect(notRule4.execute()).toBe(false);
        const notRule5 = Rule.not(onlyRule2);
        expect(notRule5.execute()).toBe(true);
    });

    it("should chain rule correctly", () => {
        const onlyRule = Rule.only(() => true);
        const onlyRule2 = Rule.only(() => false);
        expect(onlyRule.and(null)).toBe(onlyRule);
        expect(onlyRule.and(onlyRule2).execute()).toBe(false);

        expect(onlyRule.or(null)).toBe(onlyRule);
        expect(onlyRule.or(onlyRule2).execute()).toBe(true);

        expect(onlyRule.not().execute()).toBe(false);
        expect(onlyRule2.not().execute()).toBe(true);
    });

    it("should promise rule correctly", async () => {
        const onlyRule = Rule.only(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(false);
                }, 100);
            });
        });
        const onlyRule2 = Rule.only(true);
        const onlyRule3 = Rule.only(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 100);
            });
        });
        const result = await onlyRule.and(onlyRule2).execute();
        expect(result).toBe(false);

        const result2 = await onlyRule2.and(onlyRule).execute();
        expect(result2).toBe(false);

        const result3 = await onlyRule.or(onlyRule2).execute();
        expect(result3).toBe(true);

        const result4 = await onlyRule2.or(onlyRule).execute();
        expect(result4).toBe(true);

        const result5 = await onlyRule.not().execute();
        expect(result5).toBe(true);

        const result6 = await onlyRule.and(onlyRule3).execute();
        expect(result6).toBe(false);

        const result7 = await onlyRule.or(onlyRule3).execute();
        expect(result7).toBe(true);
    });
});
