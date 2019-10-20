var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import "../AndRule";
import "../NotRule";
import OnlyRule from "../OnlyRule";
import "../OrRule";
import Rule from "../Rule";
describe("Logic Rule test", function () {
    it("should create rule correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var onlyRule, onlyRule2, onlyRule3, onlyRule4, onlyRule4Result, onlyRule5, onlyRule5Result, andRule, andRule2, andRule3, andRule4, orRule, orRule2, orRule3, orRule4, notRule, notRule2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onlyRule = Rule.only(function () { return true; });
                    expect(onlyRule.execute()).toBe(true);
                    onlyRule2 = new OnlyRule(function () { return false; });
                    expect(onlyRule2.execute()).toBe(false);
                    onlyRule3 = Rule.only(false);
                    expect(onlyRule3.execute()).toBe(false);
                    onlyRule4 = Rule.only(Promise.resolve(true));
                    return [4, onlyRule4.execute()];
                case 1:
                    onlyRule4Result = _a.sent();
                    expect(onlyRule4Result).toBe(true);
                    onlyRule5 = Rule.only(function () { return Promise.resolve(false); });
                    return [4, onlyRule5.execute()];
                case 2:
                    onlyRule5Result = _a.sent();
                    expect(onlyRule5Result).toBe(false);
                    andRule = Rule.and(null, null);
                    expect(function () { return andRule.execute(); }).toThrow();
                    andRule2 = Rule.and(onlyRule, null);
                    expect(function () { return andRule2.execute(); }).toThrow();
                    andRule3 = Rule.and(null, onlyRule);
                    expect(function () { return andRule3.execute(); }).toThrow();
                    andRule4 = Rule.and(onlyRule, onlyRule2);
                    expect(andRule4.execute()).toBe(false);
                    orRule = Rule.or(null, null);
                    expect(function () { return orRule.execute(); }).toThrow();
                    orRule2 = Rule.or(onlyRule, null);
                    expect(function () { return orRule2.execute(); }).toThrow();
                    orRule3 = Rule.or(null, onlyRule);
                    expect(function () { return orRule3.execute(); }).toThrow();
                    orRule4 = Rule.or(onlyRule, onlyRule2);
                    expect(orRule4.execute()).toBe(true);
                    notRule = Rule.not(null);
                    expect(notRule.execute()).toBe(false);
                    notRule2 = Rule.not(onlyRule);
                    expect(notRule2.execute()).toBe(false);
                    return [2];
            }
        });
    }); });
    it("should and rule correctly", function () {
        var onlyRule = Rule.only(function () { return true; });
        var onlyRule2 = Rule.only(function () { return false; });
        var andRule4 = Rule.and(onlyRule, onlyRule2);
        expect(andRule4.execute()).toBe(false);
        var andRule5 = Rule.and(onlyRule, onlyRule);
        expect(andRule5.execute()).toBe(true);
        var andRule6 = Rule.and(onlyRule2, onlyRule2);
        expect(andRule6.execute()).toBe(false);
    });
    it("should or rule correctly", function () {
        var onlyRule = Rule.only(function () { return true; });
        var onlyRule2 = Rule.only(function () { return false; });
        var orRule4 = Rule.or(onlyRule, onlyRule2);
        expect(orRule4.execute()).toBe(true);
        var orRule5 = Rule.or(onlyRule, onlyRule);
        expect(orRule5.execute()).toBe(true);
        var orRule6 = Rule.or(onlyRule2, onlyRule2);
        expect(orRule6.execute()).toBe(false);
    });
    it("should not rule correctly", function () {
        var onlyRule = Rule.only(function () { return true; });
        var onlyRule2 = Rule.only(function () { return false; });
        var notRule4 = Rule.not(onlyRule);
        expect(notRule4.execute()).toBe(false);
        var notRule5 = Rule.not(onlyRule2);
        expect(notRule5.execute()).toBe(true);
    });
    it("should chain rule correctly", function () {
        var onlyRule = Rule.only(function () { return true; });
        var onlyRule2 = Rule.only(function () { return false; });
        expect(onlyRule.and(null)).toBe(onlyRule);
        expect(onlyRule.and(onlyRule2).execute()).toBe(false);
        expect(onlyRule.or(null)).toBe(onlyRule);
        expect(onlyRule.or(onlyRule2).execute()).toBe(true);
        expect(onlyRule.not().execute()).toBe(false);
        expect(onlyRule2.not().execute()).toBe(true);
    });
    it("should promise rule correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var onlyRule, onlyRule2, onlyRule3, result, result2, result3, result4, result5, result6, result7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onlyRule = Rule.only(function () {
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve(false);
                            }, 60);
                        });
                    });
                    onlyRule2 = Rule.only(true);
                    onlyRule3 = Rule.only(function () {
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve(true);
                            }, 60);
                        });
                    });
                    return [4, onlyRule.and(onlyRule2).execute()];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [4, onlyRule2.and(onlyRule).execute()];
                case 2:
                    result2 = _a.sent();
                    expect(result2).toBe(false);
                    return [4, onlyRule.or(onlyRule2).execute()];
                case 3:
                    result3 = _a.sent();
                    expect(result3).toBe(true);
                    return [4, onlyRule2.or(onlyRule).execute()];
                case 4:
                    result4 = _a.sent();
                    expect(result4).toBe(true);
                    return [4, onlyRule.not().execute()];
                case 5:
                    result5 = _a.sent();
                    expect(result5).toBe(true);
                    return [4, onlyRule.and(onlyRule3).execute()];
                case 6:
                    result6 = _a.sent();
                    expect(result6).toBe(false);
                    return [4, onlyRule.or(onlyRule3).execute()];
                case 7:
                    result7 = _a.sent();
                    expect(result7).toBe(true);
                    return [2];
            }
        });
    }); });
});
