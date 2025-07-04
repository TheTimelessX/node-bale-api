"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaleBot = void 0;
var fs_1 = require("fs");
var events_1 = require("events");
var connection_1 = require("./Network/connection");
var interfaces_1 = require("./Objects/interfaces");
var BaleBot = /** @class */ (function (_super) {
    __extends(BaleBot, _super);
    function BaleBot(BotToken, options) {
        if (options === void 0) { options = { polling_interval: 999, polling: false }; }
        var _a;
        var _this = _super.call(this) || this;
        _this.bot_token = BotToken;
        _this.request = new connection_1.Connection(_this.bot_token);
        _this.intervalId = -1;
        _this.file_id_regex = /^\d+:-?\d+:\d+:[a-f0-9]+$/;
        _this.link_url_regex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
        _this.time = 999;
        if (options.polling) {
            _this.poll((_a = options.polling_interval) !== null && _a !== void 0 ? _a : 999);
        }
        process.on("uncaughtException", function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emit("fumble", err.message, 404);
                return [2 /*return*/];
            });
        }); });
        return _this;
    }
    BaleBot.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.prototype.emit.apply(this, __spreadArray([event], args, false));
    };
    BaleBot.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    BaleBot.prototype.getMe = function () {
        return __awaiter(this, arguments, void 0, function (callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("getMe", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback({
                                        id: res.result['id'],
                                        is_bot: res.result['is_bot'],
                                        first_name: res.result['first_name'],
                                        last_name: res.result['last_name'],
                                        username: res.result['username'],
                                        language_code: res.result['language_code']
                                    });
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.logout = function () {
        return __awaiter(this, arguments, void 0, function (callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("logout", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res);
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.close = function () {
        return __awaiter(this, arguments, void 0, function (callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("close", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res);
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.sendMessage = function (chatId_1, text_1) {
        return __awaiter(this, arguments, void 0, function (chatId, text, options, callback) {
            var _, __;
            var _this = this;
            if (options === void 0) { options = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _ = options.keyboard_mode;
                        __ = {};
                        __[_] = options.reply_markup;
                        return [4 /*yield*/, this.request.makeConnection("sendMessage", {
                                chat_id: chatId,
                                text: text,
                                reply_to_message_id: options.reply_to_message_id,
                                reply_markup: JSON.stringify(__)
                            }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                return __generator(this, function (_o) {
                                    if (res.ok) {
                                        callback({
                                            text: text,
                                            from: {
                                                id: res.result.from['id'],
                                                is_bot: res.result.from['is_bot'],
                                                first_name: res.result.from['first_name'],
                                                last_name: res.result.from['last_name'],
                                                username: res.result.from['username'],
                                                language_code: res.result.from['language_code']
                                            },
                                            id: res.result['message_id'],
                                            date: res.result['date'],
                                            chat: {
                                                id: res.result.chat['id'],
                                                type: res.result.chat['type'],
                                                photo: {
                                                    big_file_id: (_c = (_b = (_a = res['result']) === null || _a === void 0 ? void 0 : _a['chat']) === null || _b === void 0 ? void 0 : _b['photo']) === null || _c === void 0 ? void 0 : _c['big_file_id'],
                                                    big_file_unique_id: (_f = (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['chat']) === null || _e === void 0 ? void 0 : _e['photo']) === null || _f === void 0 ? void 0 : _f['big_file_unique_id'],
                                                    small_file_id: (_j = (_h = (_g = res['result']) === null || _g === void 0 ? void 0 : _g['chat']) === null || _h === void 0 ? void 0 : _h['photo']) === null || _j === void 0 ? void 0 : _j['small_file_id'],
                                                    small_file_unique_id: (_m = (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['chat']) === null || _l === void 0 ? void 0 : _l['photo']) === null || _m === void 0 ? void 0 : _m['small_file_unique_id'],
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        callback({ text: undefined });
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.forwardMessage = function (chatId_1, options_1) {
        return __awaiter(this, arguments, void 0, function (chatId, options, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("forwardMessage", {
                            from_chat_id: chatId,
                            chat_id: options.to_chat,
                            message_id: options.message_id
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26;
                            return __generator(this, function (_27) {
                                if (res.ok) {
                                    callback({
                                        id: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['message_id'],
                                        from: {
                                            id: (_c = (_b = res['result']) === null || _b === void 0 ? void 0 : _b['from']) === null || _c === void 0 ? void 0 : _c['id'],
                                            is_bot: (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['from']) === null || _e === void 0 ? void 0 : _e['is_bot'],
                                            first_name: (_g = (_f = res['result']) === null || _f === void 0 ? void 0 : _f['from']) === null || _g === void 0 ? void 0 : _g['first_name'],
                                            last_name: (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['from']) === null || _j === void 0 ? void 0 : _j['last_name'],
                                            username: (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['from']) === null || _l === void 0 ? void 0 : _l['username'],
                                            language_code: (_o = (_m = res['result']) === null || _m === void 0 ? void 0 : _m['from']) === null || _o === void 0 ? void 0 : _o['language_code'],
                                        },
                                        date: (_p = res['result']) === null || _p === void 0 ? void 0 : _p['date'],
                                        chat: {
                                            id: (_r = (_q = res['result']) === null || _q === void 0 ? void 0 : _q['chat']) === null || _r === void 0 ? void 0 : _r['id'],
                                            first_name: (_t = (_s = res['result']) === null || _s === void 0 ? void 0 : _s['chat']) === null || _t === void 0 ? void 0 : _t['first_name'],
                                            last_name: (_v = (_u = res['result']) === null || _u === void 0 ? void 0 : _u['chat']) === null || _v === void 0 ? void 0 : _v['last_name'],
                                            title: (_x = (_w = res['result']) === null || _w === void 0 ? void 0 : _w['chat']) === null || _x === void 0 ? void 0 : _x['title'],
                                            type: (_z = (_y = res['result']) === null || _y === void 0 ? void 0 : _y['chat']) === null || _z === void 0 ? void 0 : _z['type'],
                                            invite_link: (_1 = (_0 = res['result']) === null || _0 === void 0 ? void 0 : _0['chat']) === null || _1 === void 0 ? void 0 : _1['invite_link'],
                                            photo: {
                                                big_file_id: (_4 = (_3 = (_2 = res['result']) === null || _2 === void 0 ? void 0 : _2['chat']) === null || _3 === void 0 ? void 0 : _3['photo']) === null || _4 === void 0 ? void 0 : _4['big_file_id'],
                                                big_file_unique_id: (_7 = (_6 = (_5 = res['result']) === null || _5 === void 0 ? void 0 : _5['chat']) === null || _6 === void 0 ? void 0 : _6['photo']) === null || _7 === void 0 ? void 0 : _7['big_file_unique_id'],
                                                small_file_id: (_10 = (_9 = (_8 = res['result']) === null || _8 === void 0 ? void 0 : _8['chat']) === null || _9 === void 0 ? void 0 : _9['photo']) === null || _10 === void 0 ? void 0 : _10['small_file_id'],
                                                small_file_unique_id: (_13 = (_12 = (_11 = res['result']) === null || _11 === void 0 ? void 0 : _11['chat']) === null || _12 === void 0 ? void 0 : _12['photo']) === null || _13 === void 0 ? void 0 : _13['small_file_unique_id'],
                                            }
                                        },
                                        forward_from: {
                                            id: (_15 = (_14 = res['result']) === null || _14 === void 0 ? void 0 : _14['from']) === null || _15 === void 0 ? void 0 : _15['id'],
                                            is_bot: (_17 = (_16 = res['result']) === null || _16 === void 0 ? void 0 : _16['from']) === null || _17 === void 0 ? void 0 : _17['is_bot'],
                                            first_name: (_19 = (_18 = res['result']) === null || _18 === void 0 ? void 0 : _18['from']) === null || _19 === void 0 ? void 0 : _19['first_name'],
                                            last_name: (_21 = (_20 = res['result']) === null || _20 === void 0 ? void 0 : _20['from']) === null || _21 === void 0 ? void 0 : _21['last_name'],
                                            username: (_23 = (_22 = res['result']) === null || _22 === void 0 ? void 0 : _22['from']) === null || _23 === void 0 ? void 0 : _23['username'],
                                            language_code: (_25 = (_24 = res['result']) === null || _24 === void 0 ? void 0 : _24['from']) === null || _25 === void 0 ? void 0 : _25['language_code'],
                                        },
                                        forward_date: (_26 = res['result']) === null || _26 === void 0 ? void 0 : _26['forward_date'],
                                        text: undefined
                                    });
                                }
                                else {
                                    callback({ text: undefined });
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.sendMedia = function (mediaOptions_1) {
        return __awaiter(this, arguments, void 0, function (mediaOptions, callback) {
            var absData, absData;
            var _this = this;
            if (callback === void 0) { callback = function (call) { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, fs_1.existsSync)(mediaOptions.path !== undefined ? mediaOptions.path : "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.request.uploadSomething({
                                path: mediaOptions.path,
                                chat_id: mediaOptions.chat_id,
                                media: mediaOptions.media,
                                reply_to_message_id: mediaOptions.reply_to_message_id,
                                reply_markup: mediaOptions.reply_markup
                            }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var f, phc, c, photos, phs_1, pcb, thumb, video, vcb, dcmnt, dcb, aud, acb, voice, acb, thumb, animation, ancb;
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118;
                                return __generator(this, function (_119) {
                                    if (res.ok) {
                                        f = {
                                            id: (_b = (_a = res['result']) === null || _a === void 0 ? void 0 : _a['from']) === null || _b === void 0 ? void 0 : _b['id'],
                                            is_bot: (_d = (_c = res['result']) === null || _c === void 0 ? void 0 : _c['from']) === null || _d === void 0 ? void 0 : _d['is_bot'],
                                            first_name: (_f = (_e = res['result']) === null || _e === void 0 ? void 0 : _e['from']) === null || _f === void 0 ? void 0 : _f['first_name'],
                                            last_name: (_h = (_g = res['result']) === null || _g === void 0 ? void 0 : _g['from']) === null || _h === void 0 ? void 0 : _h['last_name'],
                                            username: (_k = (_j = res['result']) === null || _j === void 0 ? void 0 : _j['from']) === null || _k === void 0 ? void 0 : _k['username'],
                                            language_code: (_m = (_l = res['result']) === null || _l === void 0 ? void 0 : _l['from']) === null || _m === void 0 ? void 0 : _m['language_code'],
                                        };
                                        phc = {
                                            big_file_id: (_q = (_p = (_o = res['result']) === null || _o === void 0 ? void 0 : _o['chat']) === null || _p === void 0 ? void 0 : _p['photo']) === null || _q === void 0 ? void 0 : _q['big_file_id'],
                                            big_file_unique_id: (_t = (_s = (_r = res['result']) === null || _r === void 0 ? void 0 : _r['chat']) === null || _s === void 0 ? void 0 : _s['photo']) === null || _t === void 0 ? void 0 : _t['big_file_unique_id'],
                                            small_file_id: (_w = (_v = (_u = res['result']) === null || _u === void 0 ? void 0 : _u['chat']) === null || _v === void 0 ? void 0 : _v['photo']) === null || _w === void 0 ? void 0 : _w['small_file_id'],
                                            small_file_unique_id: (_z = (_y = (_x = res['result']) === null || _x === void 0 ? void 0 : _x['chat']) === null || _y === void 0 ? void 0 : _y['photo']) === null || _z === void 0 ? void 0 : _z['small_file_unique_id'],
                                        };
                                        c = {
                                            id: (_1 = (_0 = res['result']) === null || _0 === void 0 ? void 0 : _0['chat']) === null || _1 === void 0 ? void 0 : _1['id'],
                                            first_name: (_3 = (_2 = res['result']) === null || _2 === void 0 ? void 0 : _2['chat']) === null || _3 === void 0 ? void 0 : _3['first_name'],
                                            last_name: (_5 = (_4 = res['result']) === null || _4 === void 0 ? void 0 : _4['chat']) === null || _5 === void 0 ? void 0 : _5['last_name'],
                                            title: (_7 = (_6 = res['result']) === null || _6 === void 0 ? void 0 : _6['chat']) === null || _7 === void 0 ? void 0 : _7['title'],
                                            type: (_9 = (_8 = res['result']) === null || _8 === void 0 ? void 0 : _8['chat']) === null || _9 === void 0 ? void 0 : _9['type'],
                                            invite_link: (_11 = (_10 = res['result']) === null || _10 === void 0 ? void 0 : _10['chat']) === null || _11 === void 0 ? void 0 : _11['invite_link'],
                                            photo: phc
                                        };
                                        if (mediaOptions.media === "photo") {
                                            photos = (_12 = res['result']) === null || _12 === void 0 ? void 0 : _12['photo'];
                                            phs_1 = [];
                                            photos.forEach(function (photo) {
                                                var file_id = photo.file_id, file_unique_id = photo.file_unique_id, file_size = photo.file_size, width = photo.width, height = photo.height;
                                                phs_1.push({
                                                    file_id: file_id,
                                                    file_unique_id: file_unique_id,
                                                    file_size: file_size,
                                                    width: width,
                                                    height: height
                                                });
                                            });
                                            pcb = {
                                                id: (_13 = res['result']) === null || _13 === void 0 ? void 0 : _13['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_14 = res['result']) === null || _14 === void 0 ? void 0 : _14['date'],
                                                photo: phs_1,
                                                text: undefined,
                                                caption: (_15 = res['result']) === null || _15 === void 0 ? void 0 : _15['caption']
                                            };
                                            callback(pcb);
                                        }
                                        else if (mediaOptions.media === "video") {
                                            thumb = {
                                                file_id: (_18 = (_17 = (_16 = res['result']) === null || _16 === void 0 ? void 0 : _16['video']) === null || _17 === void 0 ? void 0 : _17['thumb']) === null || _18 === void 0 ? void 0 : _18['file_id'],
                                                file_unique_id: (_21 = (_20 = (_19 = res['result']) === null || _19 === void 0 ? void 0 : _19['video']) === null || _20 === void 0 ? void 0 : _20['thumb']) === null || _21 === void 0 ? void 0 : _21['file_unique_id'],
                                                file_size: (_24 = (_23 = (_22 = res['result']) === null || _22 === void 0 ? void 0 : _22['video']) === null || _23 === void 0 ? void 0 : _23['thumb']) === null || _24 === void 0 ? void 0 : _24['file_size'],
                                                width: (_27 = (_26 = (_25 = res['result']) === null || _25 === void 0 ? void 0 : _25['video']) === null || _26 === void 0 ? void 0 : _26['thumb']) === null || _27 === void 0 ? void 0 : _27['width'],
                                                height: (_30 = (_29 = (_28 = res['result']) === null || _28 === void 0 ? void 0 : _28['video']) === null || _29 === void 0 ? void 0 : _29['thumb']) === null || _30 === void 0 ? void 0 : _30['height']
                                            };
                                            video = {
                                                file_id: (_32 = (_31 = res['result']) === null || _31 === void 0 ? void 0 : _31['video']) === null || _32 === void 0 ? void 0 : _32['file_id'],
                                                file_unique_id: (_34 = (_33 = res['result']) === null || _33 === void 0 ? void 0 : _33['video']) === null || _34 === void 0 ? void 0 : _34['file_unique_id'],
                                                file_size: (_36 = (_35 = res['result']) === null || _35 === void 0 ? void 0 : _35['video']) === null || _36 === void 0 ? void 0 : _36['file_size'],
                                                width: (_38 = (_37 = res['result']) === null || _37 === void 0 ? void 0 : _37['video']) === null || _38 === void 0 ? void 0 : _38['width'],
                                                height: (_40 = (_39 = res['result']) === null || _39 === void 0 ? void 0 : _39['video']) === null || _40 === void 0 ? void 0 : _40['height'],
                                                thumbnail: thumb,
                                                mime_type: (_42 = (_41 = res['result']) === null || _41 === void 0 ? void 0 : _41['video']) === null || _42 === void 0 ? void 0 : _42['mime_type'],
                                                duration: (_44 = (_43 = res['result']) === null || _43 === void 0 ? void 0 : _43['video']) === null || _44 === void 0 ? void 0 : _44['duration']
                                            };
                                            vcb = {
                                                id: (_45 = res['result']) === null || _45 === void 0 ? void 0 : _45['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_46 = res['result']) === null || _46 === void 0 ? void 0 : _46['date'],
                                                video: video,
                                                text: undefined,
                                                caption: (_47 = res['result']) === null || _47 === void 0 ? void 0 : _47['caption']
                                            };
                                            callback(vcb);
                                        }
                                        else if (mediaOptions.media === "document") {
                                            dcmnt = {
                                                file_id: (_49 = (_48 = res['result']) === null || _48 === void 0 ? void 0 : _48['document']) === null || _49 === void 0 ? void 0 : _49['file_id'],
                                                file_unique_id: (_51 = (_50 = res['result']) === null || _50 === void 0 ? void 0 : _50['document']) === null || _51 === void 0 ? void 0 : _51['file_unique_id'],
                                                file_name: (_53 = (_52 = res['result']) === null || _52 === void 0 ? void 0 : _52['document']) === null || _53 === void 0 ? void 0 : _53['file_name'],
                                                file_size: (_55 = (_54 = res['result']) === null || _54 === void 0 ? void 0 : _54['document']) === null || _55 === void 0 ? void 0 : _55['file_size'],
                                                mime_type: (_57 = (_56 = res['result']) === null || _56 === void 0 ? void 0 : _56['document']) === null || _57 === void 0 ? void 0 : _57['mime_type']
                                            };
                                            dcb = {
                                                id: (_58 = res['result']) === null || _58 === void 0 ? void 0 : _58['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_59 = res['result']) === null || _59 === void 0 ? void 0 : _59['date'],
                                                document: dcmnt,
                                                text: undefined,
                                                caption: (_60 = res['result']) === null || _60 === void 0 ? void 0 : _60['caption']
                                            };
                                            callback(dcb);
                                        }
                                        else if (mediaOptions.media === "audio") {
                                            aud = {
                                                file_id: (_62 = (_61 = res['result']) === null || _61 === void 0 ? void 0 : _61['audio']) === null || _62 === void 0 ? void 0 : _62['file_id'],
                                                file_unique_id: (_64 = (_63 = res['result']) === null || _63 === void 0 ? void 0 : _63['audio']) === null || _64 === void 0 ? void 0 : _64['file_unique_id'],
                                                duration: (_66 = (_65 = res['result']) === null || _65 === void 0 ? void 0 : _65['audio']) === null || _66 === void 0 ? void 0 : _66['duration'],
                                                file_size: (_68 = (_67 = res['result']) === null || _67 === void 0 ? void 0 : _67['audio']) === null || _68 === void 0 ? void 0 : _68['file_size'],
                                                mime_type: (_70 = (_69 = res['result']) === null || _69 === void 0 ? void 0 : _69['audio']) === null || _70 === void 0 ? void 0 : _70['mime_type']
                                            };
                                            acb = {
                                                id: (_71 = res['result']) === null || _71 === void 0 ? void 0 : _71['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_72 = res['result']) === null || _72 === void 0 ? void 0 : _72['date'],
                                                audio: aud,
                                                text: undefined,
                                                caption: (_73 = res['result']) === null || _73 === void 0 ? void 0 : _73['caption']
                                            };
                                            callback(acb);
                                        }
                                        else if (mediaOptions.media === "voice") {
                                            voice = {
                                                file_id: (_75 = (_74 = res['result']) === null || _74 === void 0 ? void 0 : _74['voice']) === null || _75 === void 0 ? void 0 : _75['file_id'],
                                                file_unique_id: (_77 = (_76 = res['result']) === null || _76 === void 0 ? void 0 : _76['voice']) === null || _77 === void 0 ? void 0 : _77['file_unique_id'],
                                                duration: (_79 = (_78 = res['result']) === null || _78 === void 0 ? void 0 : _78['voice']) === null || _79 === void 0 ? void 0 : _79['duration'],
                                                file_size: (_81 = (_80 = res['result']) === null || _80 === void 0 ? void 0 : _80['voice']) === null || _81 === void 0 ? void 0 : _81['file_size'],
                                                mime_type: (_83 = (_82 = res['result']) === null || _82 === void 0 ? void 0 : _82['voice']) === null || _83 === void 0 ? void 0 : _83['mime_type']
                                            };
                                            acb = {
                                                id: (_84 = res['result']) === null || _84 === void 0 ? void 0 : _84['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_85 = res['result']) === null || _85 === void 0 ? void 0 : _85['date'],
                                                voice: voice,
                                                text: undefined,
                                                caption: (_86 = res['result']) === null || _86 === void 0 ? void 0 : _86['caption']
                                            };
                                            callback(acb);
                                        }
                                        else if (mediaOptions.media === "animation") {
                                            thumb = {
                                                file_id: (_89 = (_88 = (_87 = res['result']) === null || _87 === void 0 ? void 0 : _87['video']) === null || _88 === void 0 ? void 0 : _88['thumb']) === null || _89 === void 0 ? void 0 : _89['file_id'],
                                                file_unique_id: (_92 = (_91 = (_90 = res['result']) === null || _90 === void 0 ? void 0 : _90['video']) === null || _91 === void 0 ? void 0 : _91['thumb']) === null || _92 === void 0 ? void 0 : _92['file_unique_id'],
                                                file_size: (_95 = (_94 = (_93 = res['result']) === null || _93 === void 0 ? void 0 : _93['video']) === null || _94 === void 0 ? void 0 : _94['thumb']) === null || _95 === void 0 ? void 0 : _95['file_size'],
                                                width: (_98 = (_97 = (_96 = res['result']) === null || _96 === void 0 ? void 0 : _96['video']) === null || _97 === void 0 ? void 0 : _97['thumb']) === null || _98 === void 0 ? void 0 : _98['width'],
                                                height: (_101 = (_100 = (_99 = res['result']) === null || _99 === void 0 ? void 0 : _99['video']) === null || _100 === void 0 ? void 0 : _100['thumb']) === null || _101 === void 0 ? void 0 : _101['height']
                                            };
                                            animation = {
                                                file_id: (_103 = (_102 = res['result']) === null || _102 === void 0 ? void 0 : _102['animation']) === null || _103 === void 0 ? void 0 : _103['file_id'],
                                                file_unique_id: (_105 = (_104 = res['result']) === null || _104 === void 0 ? void 0 : _104['animation']) === null || _105 === void 0 ? void 0 : _105['file_unique_id'],
                                                file_size: (_107 = (_106 = res['result']) === null || _106 === void 0 ? void 0 : _106['animation']) === null || _107 === void 0 ? void 0 : _107['file_size'],
                                                width: (_109 = (_108 = res['result']) === null || _108 === void 0 ? void 0 : _108['animation']) === null || _109 === void 0 ? void 0 : _109['width'],
                                                height: (_111 = (_110 = res['result']) === null || _110 === void 0 ? void 0 : _110['animation']) === null || _111 === void 0 ? void 0 : _111['height'],
                                                thumbnail: thumb,
                                                mime_type: (_113 = (_112 = res['result']) === null || _112 === void 0 ? void 0 : _112['animation']) === null || _113 === void 0 ? void 0 : _113['mime_type'],
                                                duration: (_115 = (_114 = res['result']) === null || _114 === void 0 ? void 0 : _114['animation']) === null || _115 === void 0 ? void 0 : _115['duration']
                                            };
                                            ancb = {
                                                id: (_116 = res['result']) === null || _116 === void 0 ? void 0 : _116['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_117 = res['result']) === null || _117 === void 0 ? void 0 : _117['date'],
                                                animation: animation,
                                                text: undefined,
                                                caption: (_118 = res['result']) === null || _118 === void 0 ? void 0 : _118['caption']
                                            };
                                            callback(ancb);
                                        }
                                    }
                                    else {
                                        callback({ text: undefined });
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(mediaOptions.path !== undefined && this.link_url_regex.test(mediaOptions.path))) return [3 /*break*/, 4];
                        absData = {};
                        Object.defineProperty(absData, "chat_id", {
                            value: mediaOptions.chat_id,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, "caption", {
                            value: mediaOptions.caption,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, "reply_to_message_id", {
                            value: mediaOptions.reply_to_message_id,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, "reply_markup", {
                            value: JSON.stringify({ keyboard: mediaOptions.reply_markup }),
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, mediaOptions.media, {
                            value: mediaOptions.path,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        return [4 /*yield*/, this.request.makeConnection("send".concat(this.request.toTitleCase(mediaOptions.media)), absData, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var f, phc, c, photos, phs_2, pcb, thumb, video, vcb, dcmnt, dcb, aud, acb, voice, acb, thumb, animation, ancb;
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118;
                                return __generator(this, function (_119) {
                                    if (res.ok) {
                                        f = {
                                            id: (_b = (_a = res['result']) === null || _a === void 0 ? void 0 : _a['from']) === null || _b === void 0 ? void 0 : _b['id'],
                                            is_bot: (_d = (_c = res['result']) === null || _c === void 0 ? void 0 : _c['from']) === null || _d === void 0 ? void 0 : _d['is_bot'],
                                            first_name: (_f = (_e = res['result']) === null || _e === void 0 ? void 0 : _e['from']) === null || _f === void 0 ? void 0 : _f['first_name'],
                                            last_name: (_h = (_g = res['result']) === null || _g === void 0 ? void 0 : _g['from']) === null || _h === void 0 ? void 0 : _h['last_name'],
                                            username: (_k = (_j = res['result']) === null || _j === void 0 ? void 0 : _j['from']) === null || _k === void 0 ? void 0 : _k['username'],
                                            language_code: (_m = (_l = res['result']) === null || _l === void 0 ? void 0 : _l['from']) === null || _m === void 0 ? void 0 : _m['language_code'],
                                        };
                                        phc = {
                                            big_file_id: (_q = (_p = (_o = res['result']) === null || _o === void 0 ? void 0 : _o['chat']) === null || _p === void 0 ? void 0 : _p['photo']) === null || _q === void 0 ? void 0 : _q['big_file_id'],
                                            big_file_unique_id: (_t = (_s = (_r = res['result']) === null || _r === void 0 ? void 0 : _r['chat']) === null || _s === void 0 ? void 0 : _s['photo']) === null || _t === void 0 ? void 0 : _t['big_file_unique_id'],
                                            small_file_id: (_w = (_v = (_u = res['result']) === null || _u === void 0 ? void 0 : _u['chat']) === null || _v === void 0 ? void 0 : _v['photo']) === null || _w === void 0 ? void 0 : _w['small_file_id'],
                                            small_file_unique_id: (_z = (_y = (_x = res['result']) === null || _x === void 0 ? void 0 : _x['chat']) === null || _y === void 0 ? void 0 : _y['photo']) === null || _z === void 0 ? void 0 : _z['small_file_unique_id'],
                                        };
                                        c = {
                                            id: (_1 = (_0 = res['result']) === null || _0 === void 0 ? void 0 : _0['chat']) === null || _1 === void 0 ? void 0 : _1['id'],
                                            first_name: (_3 = (_2 = res['result']) === null || _2 === void 0 ? void 0 : _2['chat']) === null || _3 === void 0 ? void 0 : _3['first_name'],
                                            last_name: (_5 = (_4 = res['result']) === null || _4 === void 0 ? void 0 : _4['chat']) === null || _5 === void 0 ? void 0 : _5['last_name'],
                                            title: (_7 = (_6 = res['result']) === null || _6 === void 0 ? void 0 : _6['chat']) === null || _7 === void 0 ? void 0 : _7['title'],
                                            type: (_9 = (_8 = res['result']) === null || _8 === void 0 ? void 0 : _8['chat']) === null || _9 === void 0 ? void 0 : _9['type'],
                                            invite_link: (_11 = (_10 = res['result']) === null || _10 === void 0 ? void 0 : _10['chat']) === null || _11 === void 0 ? void 0 : _11['invite_link'],
                                            photo: phc
                                        };
                                        if (mediaOptions.media === "photo") {
                                            photos = (_12 = res['result']) === null || _12 === void 0 ? void 0 : _12['photo'];
                                            phs_2 = [];
                                            photos.forEach(function (photo) {
                                                var file_id = photo.file_id, file_unique_id = photo.file_unique_id, file_size = photo.file_size, width = photo.width, height = photo.height;
                                                phs_2.push({
                                                    file_id: file_id,
                                                    file_unique_id: file_unique_id,
                                                    file_size: file_size,
                                                    width: width,
                                                    height: height
                                                });
                                            });
                                            pcb = {
                                                id: (_13 = res['result']) === null || _13 === void 0 ? void 0 : _13['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_14 = res['result']) === null || _14 === void 0 ? void 0 : _14['date'],
                                                photo: phs_2,
                                                text: undefined,
                                                caption: (_15 = res['result']) === null || _15 === void 0 ? void 0 : _15['caption']
                                            };
                                            callback(pcb);
                                        }
                                        else if (mediaOptions.media === "video") {
                                            thumb = {
                                                file_id: (_18 = (_17 = (_16 = res['result']) === null || _16 === void 0 ? void 0 : _16['video']) === null || _17 === void 0 ? void 0 : _17['thumb']) === null || _18 === void 0 ? void 0 : _18['file_id'],
                                                file_unique_id: (_21 = (_20 = (_19 = res['result']) === null || _19 === void 0 ? void 0 : _19['video']) === null || _20 === void 0 ? void 0 : _20['thumb']) === null || _21 === void 0 ? void 0 : _21['file_unique_id'],
                                                file_size: (_24 = (_23 = (_22 = res['result']) === null || _22 === void 0 ? void 0 : _22['video']) === null || _23 === void 0 ? void 0 : _23['thumb']) === null || _24 === void 0 ? void 0 : _24['file_size'],
                                                width: (_27 = (_26 = (_25 = res['result']) === null || _25 === void 0 ? void 0 : _25['video']) === null || _26 === void 0 ? void 0 : _26['thumb']) === null || _27 === void 0 ? void 0 : _27['width'],
                                                height: (_30 = (_29 = (_28 = res['result']) === null || _28 === void 0 ? void 0 : _28['video']) === null || _29 === void 0 ? void 0 : _29['thumb']) === null || _30 === void 0 ? void 0 : _30['height']
                                            };
                                            video = {
                                                file_id: (_32 = (_31 = res['result']) === null || _31 === void 0 ? void 0 : _31['video']) === null || _32 === void 0 ? void 0 : _32['file_id'],
                                                file_unique_id: (_34 = (_33 = res['result']) === null || _33 === void 0 ? void 0 : _33['video']) === null || _34 === void 0 ? void 0 : _34['file_unique_id'],
                                                file_size: (_36 = (_35 = res['result']) === null || _35 === void 0 ? void 0 : _35['video']) === null || _36 === void 0 ? void 0 : _36['file_size'],
                                                width: (_38 = (_37 = res['result']) === null || _37 === void 0 ? void 0 : _37['video']) === null || _38 === void 0 ? void 0 : _38['width'],
                                                height: (_40 = (_39 = res['result']) === null || _39 === void 0 ? void 0 : _39['video']) === null || _40 === void 0 ? void 0 : _40['height'],
                                                thumbnail: thumb,
                                                mime_type: (_42 = (_41 = res['result']) === null || _41 === void 0 ? void 0 : _41['video']) === null || _42 === void 0 ? void 0 : _42['mime_type'],
                                                duration: (_44 = (_43 = res['result']) === null || _43 === void 0 ? void 0 : _43['video']) === null || _44 === void 0 ? void 0 : _44['duration']
                                            };
                                            vcb = {
                                                id: (_45 = res['result']) === null || _45 === void 0 ? void 0 : _45['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_46 = res['result']) === null || _46 === void 0 ? void 0 : _46['date'],
                                                video: video,
                                                text: undefined,
                                                caption: (_47 = res['result']) === null || _47 === void 0 ? void 0 : _47['caption']
                                            };
                                            callback(vcb);
                                        }
                                        else if (mediaOptions.media === "document") {
                                            dcmnt = {
                                                file_id: (_49 = (_48 = res['result']) === null || _48 === void 0 ? void 0 : _48['document']) === null || _49 === void 0 ? void 0 : _49['file_id'],
                                                file_unique_id: (_51 = (_50 = res['result']) === null || _50 === void 0 ? void 0 : _50['document']) === null || _51 === void 0 ? void 0 : _51['file_unique_id'],
                                                file_name: (_53 = (_52 = res['result']) === null || _52 === void 0 ? void 0 : _52['document']) === null || _53 === void 0 ? void 0 : _53['file_name'],
                                                file_size: (_55 = (_54 = res['result']) === null || _54 === void 0 ? void 0 : _54['document']) === null || _55 === void 0 ? void 0 : _55['file_size'],
                                                mime_type: (_57 = (_56 = res['result']) === null || _56 === void 0 ? void 0 : _56['document']) === null || _57 === void 0 ? void 0 : _57['mime_type']
                                            };
                                            dcb = {
                                                id: (_58 = res['result']) === null || _58 === void 0 ? void 0 : _58['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_59 = res['result']) === null || _59 === void 0 ? void 0 : _59['date'],
                                                document: dcmnt,
                                                text: undefined,
                                                caption: (_60 = res['result']) === null || _60 === void 0 ? void 0 : _60['caption']
                                            };
                                            callback(dcb);
                                        }
                                        else if (mediaOptions.media === "audio") {
                                            aud = {
                                                file_id: (_62 = (_61 = res['result']) === null || _61 === void 0 ? void 0 : _61['audio']) === null || _62 === void 0 ? void 0 : _62['file_id'],
                                                file_unique_id: (_64 = (_63 = res['result']) === null || _63 === void 0 ? void 0 : _63['audio']) === null || _64 === void 0 ? void 0 : _64['file_unique_id'],
                                                duration: (_66 = (_65 = res['result']) === null || _65 === void 0 ? void 0 : _65['audio']) === null || _66 === void 0 ? void 0 : _66['duration'],
                                                file_size: (_68 = (_67 = res['result']) === null || _67 === void 0 ? void 0 : _67['audio']) === null || _68 === void 0 ? void 0 : _68['file_size'],
                                                mime_type: (_70 = (_69 = res['result']) === null || _69 === void 0 ? void 0 : _69['audio']) === null || _70 === void 0 ? void 0 : _70['mime_type']
                                            };
                                            acb = {
                                                id: (_71 = res['result']) === null || _71 === void 0 ? void 0 : _71['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_72 = res['result']) === null || _72 === void 0 ? void 0 : _72['date'],
                                                audio: aud,
                                                text: undefined,
                                                caption: (_73 = res['result']) === null || _73 === void 0 ? void 0 : _73['caption']
                                            };
                                            callback(acb);
                                        }
                                        else if (mediaOptions.media === "voice") {
                                            voice = {
                                                file_id: (_75 = (_74 = res['result']) === null || _74 === void 0 ? void 0 : _74['voice']) === null || _75 === void 0 ? void 0 : _75['file_id'],
                                                file_unique_id: (_77 = (_76 = res['result']) === null || _76 === void 0 ? void 0 : _76['voice']) === null || _77 === void 0 ? void 0 : _77['file_unique_id'],
                                                duration: (_79 = (_78 = res['result']) === null || _78 === void 0 ? void 0 : _78['voice']) === null || _79 === void 0 ? void 0 : _79['duration'],
                                                file_size: (_81 = (_80 = res['result']) === null || _80 === void 0 ? void 0 : _80['voice']) === null || _81 === void 0 ? void 0 : _81['file_size'],
                                                mime_type: (_83 = (_82 = res['result']) === null || _82 === void 0 ? void 0 : _82['voice']) === null || _83 === void 0 ? void 0 : _83['mime_type']
                                            };
                                            acb = {
                                                id: (_84 = res['result']) === null || _84 === void 0 ? void 0 : _84['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_85 = res['result']) === null || _85 === void 0 ? void 0 : _85['date'],
                                                voice: voice,
                                                text: undefined,
                                                caption: (_86 = res['result']) === null || _86 === void 0 ? void 0 : _86['caption']
                                            };
                                            callback(acb);
                                        }
                                        else if (mediaOptions.media === "animation") {
                                            thumb = {
                                                file_id: (_89 = (_88 = (_87 = res['result']) === null || _87 === void 0 ? void 0 : _87['video']) === null || _88 === void 0 ? void 0 : _88['thumb']) === null || _89 === void 0 ? void 0 : _89['file_id'],
                                                file_unique_id: (_92 = (_91 = (_90 = res['result']) === null || _90 === void 0 ? void 0 : _90['video']) === null || _91 === void 0 ? void 0 : _91['thumb']) === null || _92 === void 0 ? void 0 : _92['file_unique_id'],
                                                file_size: (_95 = (_94 = (_93 = res['result']) === null || _93 === void 0 ? void 0 : _93['video']) === null || _94 === void 0 ? void 0 : _94['thumb']) === null || _95 === void 0 ? void 0 : _95['file_size'],
                                                width: (_98 = (_97 = (_96 = res['result']) === null || _96 === void 0 ? void 0 : _96['video']) === null || _97 === void 0 ? void 0 : _97['thumb']) === null || _98 === void 0 ? void 0 : _98['width'],
                                                height: (_101 = (_100 = (_99 = res['result']) === null || _99 === void 0 ? void 0 : _99['video']) === null || _100 === void 0 ? void 0 : _100['thumb']) === null || _101 === void 0 ? void 0 : _101['height']
                                            };
                                            animation = {
                                                file_id: (_103 = (_102 = res['result']) === null || _102 === void 0 ? void 0 : _102['animation']) === null || _103 === void 0 ? void 0 : _103['file_id'],
                                                file_unique_id: (_105 = (_104 = res['result']) === null || _104 === void 0 ? void 0 : _104['animation']) === null || _105 === void 0 ? void 0 : _105['file_unique_id'],
                                                file_size: (_107 = (_106 = res['result']) === null || _106 === void 0 ? void 0 : _106['animation']) === null || _107 === void 0 ? void 0 : _107['file_size'],
                                                width: (_109 = (_108 = res['result']) === null || _108 === void 0 ? void 0 : _108['animation']) === null || _109 === void 0 ? void 0 : _109['width'],
                                                height: (_111 = (_110 = res['result']) === null || _110 === void 0 ? void 0 : _110['animation']) === null || _111 === void 0 ? void 0 : _111['height'],
                                                thumbnail: thumb,
                                                mime_type: (_113 = (_112 = res['result']) === null || _112 === void 0 ? void 0 : _112['animation']) === null || _113 === void 0 ? void 0 : _113['mime_type'],
                                                duration: (_115 = (_114 = res['result']) === null || _114 === void 0 ? void 0 : _114['animation']) === null || _115 === void 0 ? void 0 : _115['duration']
                                            };
                                            ancb = {
                                                id: (_116 = res['result']) === null || _116 === void 0 ? void 0 : _116['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_117 = res['result']) === null || _117 === void 0 ? void 0 : _117['date'],
                                                animation: animation,
                                                text: undefined,
                                                caption: (_118 = res['result']) === null || _118 === void 0 ? void 0 : _118['caption']
                                            };
                                            callback(ancb);
                                        }
                                    }
                                    else {
                                        callback({ text: undefined });
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(mediaOptions.file_id !== undefined && this.file_id_regex.test(mediaOptions.file_id))) return [3 /*break*/, 6];
                        absData = {};
                        Object.defineProperty(absData, "chat_id", {
                            value: mediaOptions.chat_id,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, "caption", {
                            value: mediaOptions.caption,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, "reply_to_message_id", {
                            value: mediaOptions.reply_to_message_id,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, "reply_markup", {
                            value: JSON.stringify({ keyboard: mediaOptions.reply_markup }),
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(absData, mediaOptions.media, {
                            value: mediaOptions.file_id,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                        return [4 /*yield*/, this.request.makeConnection("send".concat(this.request.toTitleCase(mediaOptions.media)), absData, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var f, phc, c, photos, phs_3, pcb, thumb, video, vcb, dcmnt, dcb, aud, acb, voice, acb, thumb, animation, ancb;
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118;
                                return __generator(this, function (_119) {
                                    if (res.ok) {
                                        f = {
                                            id: (_b = (_a = res['result']) === null || _a === void 0 ? void 0 : _a['from']) === null || _b === void 0 ? void 0 : _b['id'],
                                            is_bot: (_d = (_c = res['result']) === null || _c === void 0 ? void 0 : _c['from']) === null || _d === void 0 ? void 0 : _d['is_bot'],
                                            first_name: (_f = (_e = res['result']) === null || _e === void 0 ? void 0 : _e['from']) === null || _f === void 0 ? void 0 : _f['first_name'],
                                            last_name: (_h = (_g = res['result']) === null || _g === void 0 ? void 0 : _g['from']) === null || _h === void 0 ? void 0 : _h['last_name'],
                                            username: (_k = (_j = res['result']) === null || _j === void 0 ? void 0 : _j['from']) === null || _k === void 0 ? void 0 : _k['username'],
                                            language_code: (_m = (_l = res['result']) === null || _l === void 0 ? void 0 : _l['from']) === null || _m === void 0 ? void 0 : _m['language_code'],
                                        };
                                        phc = {
                                            big_file_id: (_q = (_p = (_o = res['result']) === null || _o === void 0 ? void 0 : _o['chat']) === null || _p === void 0 ? void 0 : _p['photo']) === null || _q === void 0 ? void 0 : _q['big_file_id'],
                                            big_file_unique_id: (_t = (_s = (_r = res['result']) === null || _r === void 0 ? void 0 : _r['chat']) === null || _s === void 0 ? void 0 : _s['photo']) === null || _t === void 0 ? void 0 : _t['big_file_unique_id'],
                                            small_file_id: (_w = (_v = (_u = res['result']) === null || _u === void 0 ? void 0 : _u['chat']) === null || _v === void 0 ? void 0 : _v['photo']) === null || _w === void 0 ? void 0 : _w['small_file_id'],
                                            small_file_unique_id: (_z = (_y = (_x = res['result']) === null || _x === void 0 ? void 0 : _x['chat']) === null || _y === void 0 ? void 0 : _y['photo']) === null || _z === void 0 ? void 0 : _z['small_file_unique_id'],
                                        };
                                        c = {
                                            id: (_1 = (_0 = res['result']) === null || _0 === void 0 ? void 0 : _0['chat']) === null || _1 === void 0 ? void 0 : _1['id'],
                                            first_name: (_3 = (_2 = res['result']) === null || _2 === void 0 ? void 0 : _2['chat']) === null || _3 === void 0 ? void 0 : _3['first_name'],
                                            last_name: (_5 = (_4 = res['result']) === null || _4 === void 0 ? void 0 : _4['chat']) === null || _5 === void 0 ? void 0 : _5['last_name'],
                                            title: (_7 = (_6 = res['result']) === null || _6 === void 0 ? void 0 : _6['chat']) === null || _7 === void 0 ? void 0 : _7['title'],
                                            type: (_9 = (_8 = res['result']) === null || _8 === void 0 ? void 0 : _8['chat']) === null || _9 === void 0 ? void 0 : _9['type'],
                                            invite_link: (_11 = (_10 = res['result']) === null || _10 === void 0 ? void 0 : _10['chat']) === null || _11 === void 0 ? void 0 : _11['invite_link'],
                                            photo: phc
                                        };
                                        if (mediaOptions.media === "photo") {
                                            photos = (_12 = res['result']) === null || _12 === void 0 ? void 0 : _12['photo'];
                                            phs_3 = [];
                                            photos.forEach(function (photo) {
                                                var file_id = photo.file_id, file_unique_id = photo.file_unique_id, file_size = photo.file_size, width = photo.width, height = photo.height;
                                                phs_3.push({
                                                    file_id: file_id,
                                                    file_unique_id: file_unique_id,
                                                    file_size: file_size,
                                                    width: width,
                                                    height: height
                                                });
                                            });
                                            pcb = {
                                                id: (_13 = res['result']) === null || _13 === void 0 ? void 0 : _13['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_14 = res['result']) === null || _14 === void 0 ? void 0 : _14['date'],
                                                photo: phs_3,
                                                text: undefined,
                                                caption: (_15 = res['result']) === null || _15 === void 0 ? void 0 : _15['caption']
                                            };
                                            callback(pcb);
                                        }
                                        else if (mediaOptions.media === "video") {
                                            thumb = {
                                                file_id: (_18 = (_17 = (_16 = res['result']) === null || _16 === void 0 ? void 0 : _16['video']) === null || _17 === void 0 ? void 0 : _17['thumb']) === null || _18 === void 0 ? void 0 : _18['file_id'],
                                                file_unique_id: (_21 = (_20 = (_19 = res['result']) === null || _19 === void 0 ? void 0 : _19['video']) === null || _20 === void 0 ? void 0 : _20['thumb']) === null || _21 === void 0 ? void 0 : _21['file_unique_id'],
                                                file_size: (_24 = (_23 = (_22 = res['result']) === null || _22 === void 0 ? void 0 : _22['video']) === null || _23 === void 0 ? void 0 : _23['thumb']) === null || _24 === void 0 ? void 0 : _24['file_size'],
                                                width: (_27 = (_26 = (_25 = res['result']) === null || _25 === void 0 ? void 0 : _25['video']) === null || _26 === void 0 ? void 0 : _26['thumb']) === null || _27 === void 0 ? void 0 : _27['width'],
                                                height: (_30 = (_29 = (_28 = res['result']) === null || _28 === void 0 ? void 0 : _28['video']) === null || _29 === void 0 ? void 0 : _29['thumb']) === null || _30 === void 0 ? void 0 : _30['height']
                                            };
                                            video = {
                                                file_id: (_32 = (_31 = res['result']) === null || _31 === void 0 ? void 0 : _31['video']) === null || _32 === void 0 ? void 0 : _32['file_id'],
                                                file_unique_id: (_34 = (_33 = res['result']) === null || _33 === void 0 ? void 0 : _33['video']) === null || _34 === void 0 ? void 0 : _34['file_unique_id'],
                                                file_size: (_36 = (_35 = res['result']) === null || _35 === void 0 ? void 0 : _35['video']) === null || _36 === void 0 ? void 0 : _36['file_size'],
                                                width: (_38 = (_37 = res['result']) === null || _37 === void 0 ? void 0 : _37['video']) === null || _38 === void 0 ? void 0 : _38['width'],
                                                height: (_40 = (_39 = res['result']) === null || _39 === void 0 ? void 0 : _39['video']) === null || _40 === void 0 ? void 0 : _40['height'],
                                                thumbnail: thumb,
                                                mime_type: (_42 = (_41 = res['result']) === null || _41 === void 0 ? void 0 : _41['video']) === null || _42 === void 0 ? void 0 : _42['mime_type'],
                                                duration: (_44 = (_43 = res['result']) === null || _43 === void 0 ? void 0 : _43['video']) === null || _44 === void 0 ? void 0 : _44['duration']
                                            };
                                            vcb = {
                                                id: (_45 = res['result']) === null || _45 === void 0 ? void 0 : _45['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_46 = res['result']) === null || _46 === void 0 ? void 0 : _46['date'],
                                                video: video,
                                                text: undefined,
                                                caption: (_47 = res['result']) === null || _47 === void 0 ? void 0 : _47['caption']
                                            };
                                            callback(vcb);
                                        }
                                        else if (mediaOptions.media === "document") {
                                            dcmnt = {
                                                file_id: (_49 = (_48 = res['result']) === null || _48 === void 0 ? void 0 : _48['document']) === null || _49 === void 0 ? void 0 : _49['file_id'],
                                                file_unique_id: (_51 = (_50 = res['result']) === null || _50 === void 0 ? void 0 : _50['document']) === null || _51 === void 0 ? void 0 : _51['file_unique_id'],
                                                file_name: (_53 = (_52 = res['result']) === null || _52 === void 0 ? void 0 : _52['document']) === null || _53 === void 0 ? void 0 : _53['file_name'],
                                                file_size: (_55 = (_54 = res['result']) === null || _54 === void 0 ? void 0 : _54['document']) === null || _55 === void 0 ? void 0 : _55['file_size'],
                                                mime_type: (_57 = (_56 = res['result']) === null || _56 === void 0 ? void 0 : _56['document']) === null || _57 === void 0 ? void 0 : _57['mime_type']
                                            };
                                            dcb = {
                                                id: (_58 = res['result']) === null || _58 === void 0 ? void 0 : _58['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_59 = res['result']) === null || _59 === void 0 ? void 0 : _59['date'],
                                                document: dcmnt,
                                                text: undefined,
                                                caption: (_60 = res['result']) === null || _60 === void 0 ? void 0 : _60['caption']
                                            };
                                            callback(dcb);
                                        }
                                        else if (mediaOptions.media === "audio") {
                                            aud = {
                                                file_id: (_62 = (_61 = res['result']) === null || _61 === void 0 ? void 0 : _61['audio']) === null || _62 === void 0 ? void 0 : _62['file_id'],
                                                file_unique_id: (_64 = (_63 = res['result']) === null || _63 === void 0 ? void 0 : _63['audio']) === null || _64 === void 0 ? void 0 : _64['file_unique_id'],
                                                duration: (_66 = (_65 = res['result']) === null || _65 === void 0 ? void 0 : _65['audio']) === null || _66 === void 0 ? void 0 : _66['duration'],
                                                file_size: (_68 = (_67 = res['result']) === null || _67 === void 0 ? void 0 : _67['audio']) === null || _68 === void 0 ? void 0 : _68['file_size'],
                                                mime_type: (_70 = (_69 = res['result']) === null || _69 === void 0 ? void 0 : _69['audio']) === null || _70 === void 0 ? void 0 : _70['mime_type']
                                            };
                                            acb = {
                                                id: (_71 = res['result']) === null || _71 === void 0 ? void 0 : _71['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_72 = res['result']) === null || _72 === void 0 ? void 0 : _72['date'],
                                                audio: aud,
                                                text: undefined,
                                                caption: (_73 = res['result']) === null || _73 === void 0 ? void 0 : _73['caption']
                                            };
                                            callback(acb);
                                        }
                                        else if (mediaOptions.media === "voice") {
                                            voice = {
                                                file_id: (_75 = (_74 = res['result']) === null || _74 === void 0 ? void 0 : _74['voice']) === null || _75 === void 0 ? void 0 : _75['file_id'],
                                                file_unique_id: (_77 = (_76 = res['result']) === null || _76 === void 0 ? void 0 : _76['voice']) === null || _77 === void 0 ? void 0 : _77['file_unique_id'],
                                                duration: (_79 = (_78 = res['result']) === null || _78 === void 0 ? void 0 : _78['voice']) === null || _79 === void 0 ? void 0 : _79['duration'],
                                                file_size: (_81 = (_80 = res['result']) === null || _80 === void 0 ? void 0 : _80['voice']) === null || _81 === void 0 ? void 0 : _81['file_size'],
                                                mime_type: (_83 = (_82 = res['result']) === null || _82 === void 0 ? void 0 : _82['voice']) === null || _83 === void 0 ? void 0 : _83['mime_type']
                                            };
                                            acb = {
                                                id: (_84 = res['result']) === null || _84 === void 0 ? void 0 : _84['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_85 = res['result']) === null || _85 === void 0 ? void 0 : _85['date'],
                                                voice: voice,
                                                text: undefined,
                                                caption: (_86 = res['result']) === null || _86 === void 0 ? void 0 : _86['caption']
                                            };
                                            callback(acb);
                                        }
                                        else if (mediaOptions.media === "animation") {
                                            thumb = {
                                                file_id: (_89 = (_88 = (_87 = res['result']) === null || _87 === void 0 ? void 0 : _87['video']) === null || _88 === void 0 ? void 0 : _88['thumb']) === null || _89 === void 0 ? void 0 : _89['file_id'],
                                                file_unique_id: (_92 = (_91 = (_90 = res['result']) === null || _90 === void 0 ? void 0 : _90['video']) === null || _91 === void 0 ? void 0 : _91['thumb']) === null || _92 === void 0 ? void 0 : _92['file_unique_id'],
                                                file_size: (_95 = (_94 = (_93 = res['result']) === null || _93 === void 0 ? void 0 : _93['video']) === null || _94 === void 0 ? void 0 : _94['thumb']) === null || _95 === void 0 ? void 0 : _95['file_size'],
                                                width: (_98 = (_97 = (_96 = res['result']) === null || _96 === void 0 ? void 0 : _96['video']) === null || _97 === void 0 ? void 0 : _97['thumb']) === null || _98 === void 0 ? void 0 : _98['width'],
                                                height: (_101 = (_100 = (_99 = res['result']) === null || _99 === void 0 ? void 0 : _99['video']) === null || _100 === void 0 ? void 0 : _100['thumb']) === null || _101 === void 0 ? void 0 : _101['height']
                                            };
                                            animation = {
                                                file_id: (_103 = (_102 = res['result']) === null || _102 === void 0 ? void 0 : _102['animation']) === null || _103 === void 0 ? void 0 : _103['file_id'],
                                                file_unique_id: (_105 = (_104 = res['result']) === null || _104 === void 0 ? void 0 : _104['animation']) === null || _105 === void 0 ? void 0 : _105['file_unique_id'],
                                                file_size: (_107 = (_106 = res['result']) === null || _106 === void 0 ? void 0 : _106['animation']) === null || _107 === void 0 ? void 0 : _107['file_size'],
                                                width: (_109 = (_108 = res['result']) === null || _108 === void 0 ? void 0 : _108['animation']) === null || _109 === void 0 ? void 0 : _109['width'],
                                                height: (_111 = (_110 = res['result']) === null || _110 === void 0 ? void 0 : _110['animation']) === null || _111 === void 0 ? void 0 : _111['height'],
                                                thumbnail: thumb,
                                                mime_type: (_113 = (_112 = res['result']) === null || _112 === void 0 ? void 0 : _112['animation']) === null || _113 === void 0 ? void 0 : _113['mime_type'],
                                                duration: (_115 = (_114 = res['result']) === null || _114 === void 0 ? void 0 : _114['animation']) === null || _115 === void 0 ? void 0 : _115['duration']
                                            };
                                            ancb = {
                                                id: (_116 = res['result']) === null || _116 === void 0 ? void 0 : _116['message_id'],
                                                from: f,
                                                chat: c,
                                                date: (_117 = res['result']) === null || _117 === void 0 ? void 0 : _117['date'],
                                                animation: animation,
                                                text: undefined,
                                                caption: (_118 = res['result']) === null || _118 === void 0 ? void 0 : _118['caption']
                                            };
                                            callback(ancb);
                                        }
                                    }
                                    else {
                                        callback({ text: undefined });
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.sendLocation = function (chatId_1, latitude_1, longitude_1) {
        return __awaiter(this, arguments, void 0, function (chatId, latitude, longitude, options, horizontalAccuracy, callback) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (horizontalAccuracy === void 0) { horizontalAccuracy = null; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("sendLocation", {
                            chat_id: chatId,
                            latitude: latitude,
                            longitude: longitude,
                            horizontal_accuracy: horizontalAccuracy,
                            reply_to_message_id: options.reply_to_message_id,
                            reply_markup: JSON.stringify({}[options.keyboard_mode] = options.reply_markup)
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
                            return __generator(this, function (_17) {
                                if (res.ok) {
                                    callback({
                                        id: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['message_id'],
                                        chat: {
                                            id: (_c = (_b = res['result']) === null || _b === void 0 ? void 0 : _b['chat']) === null || _c === void 0 ? void 0 : _c['id'],
                                            first_name: (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['chat']) === null || _e === void 0 ? void 0 : _e['first_name'],
                                            last_name: (_g = (_f = res['result']) === null || _f === void 0 ? void 0 : _f['chat']) === null || _g === void 0 ? void 0 : _g['last_name'],
                                            title: (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['chat']) === null || _j === void 0 ? void 0 : _j['title'],
                                            type: (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['chat']) === null || _l === void 0 ? void 0 : _l['type'],
                                            invite_link: (_o = (_m = res['result']) === null || _m === void 0 ? void 0 : _m['chat']) === null || _o === void 0 ? void 0 : _o['invite_link'],
                                            photo: {
                                                big_file_id: (_r = (_q = (_p = res['result']) === null || _p === void 0 ? void 0 : _p['chat']) === null || _q === void 0 ? void 0 : _q['photo']) === null || _r === void 0 ? void 0 : _r['big_file_id'],
                                                big_file_unique_id: (_u = (_t = (_s = res['result']) === null || _s === void 0 ? void 0 : _s['chat']) === null || _t === void 0 ? void 0 : _t['photo']) === null || _u === void 0 ? void 0 : _u['big_file_unique_id'],
                                                small_file_id: (_x = (_w = (_v = res['result']) === null || _v === void 0 ? void 0 : _v['chat']) === null || _w === void 0 ? void 0 : _w['photo']) === null || _x === void 0 ? void 0 : _x['small_file_id'],
                                                small_file_unique_id: (_0 = (_z = (_y = res['result']) === null || _y === void 0 ? void 0 : _y['chat']) === null || _z === void 0 ? void 0 : _z['photo']) === null || _0 === void 0 ? void 0 : _0['small_file_unique_id'],
                                            }
                                        },
                                        from: {
                                            id: (_2 = (_1 = res['result']) === null || _1 === void 0 ? void 0 : _1['from']) === null || _2 === void 0 ? void 0 : _2['id'],
                                            is_bot: (_4 = (_3 = res['result']) === null || _3 === void 0 ? void 0 : _3['from']) === null || _4 === void 0 ? void 0 : _4['is_bot'],
                                            first_name: (_6 = (_5 = res['result']) === null || _5 === void 0 ? void 0 : _5['from']) === null || _6 === void 0 ? void 0 : _6['first_name'],
                                            last_name: (_8 = (_7 = res['result']) === null || _7 === void 0 ? void 0 : _7['from']) === null || _8 === void 0 ? void 0 : _8['last_name'],
                                            username: (_10 = (_9 = res['result']) === null || _9 === void 0 ? void 0 : _9['from']) === null || _10 === void 0 ? void 0 : _10['username'],
                                            language_code: (_12 = (_11 = res['result']) === null || _11 === void 0 ? void 0 : _11['from']) === null || _12 === void 0 ? void 0 : _12['language_code'],
                                        },
                                        location: {
                                            longitude: (_14 = (_13 = res['result']) === null || _13 === void 0 ? void 0 : _13['location']) === null || _14 === void 0 ? void 0 : _14['longitude'],
                                            latitude: (_16 = (_15 = res['result']) === null || _15 === void 0 ? void 0 : _15['location']) === null || _16 === void 0 ? void 0 : _16['latitude']
                                        },
                                        text: undefined
                                    });
                                }
                                else {
                                    callback({ text: undefined });
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.sendContact = function (chatId_1, phoneNumber_1, firstName_1) {
        return __awaiter(this, arguments, void 0, function (chatId, phoneNumber, firstName, lastName, options, callback) {
            var _this = this;
            if (lastName === void 0) { lastName = null; }
            if (options === void 0) { options = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("sendContact", {
                            chat_id: chatId,
                            phone_number: phoneNumber,
                            first_name: firstName,
                            last_name: lastName,
                            reply_to_message_id: options.reply_to_message_id,
                            reply_markup: JSON.stringify({}[options.keyboard_mode] = options.reply_markup)
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20;
                            return __generator(this, function (_21) {
                                if (res.ok) {
                                    callback({
                                        id: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['message_id'],
                                        chat: {
                                            id: (_c = (_b = res['result']) === null || _b === void 0 ? void 0 : _b['chat']) === null || _c === void 0 ? void 0 : _c['id'],
                                            first_name: (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['chat']) === null || _e === void 0 ? void 0 : _e['first_name'],
                                            last_name: (_g = (_f = res['result']) === null || _f === void 0 ? void 0 : _f['chat']) === null || _g === void 0 ? void 0 : _g['last_name'],
                                            title: (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['chat']) === null || _j === void 0 ? void 0 : _j['title'],
                                            type: (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['chat']) === null || _l === void 0 ? void 0 : _l['type'],
                                            invite_link: (_o = (_m = res['result']) === null || _m === void 0 ? void 0 : _m['chat']) === null || _o === void 0 ? void 0 : _o['invite_link'],
                                            photo: {
                                                big_file_id: (_r = (_q = (_p = res['result']) === null || _p === void 0 ? void 0 : _p['chat']) === null || _q === void 0 ? void 0 : _q['photo']) === null || _r === void 0 ? void 0 : _r['big_file_id'],
                                                big_file_unique_id: (_u = (_t = (_s = res['result']) === null || _s === void 0 ? void 0 : _s['chat']) === null || _t === void 0 ? void 0 : _t['photo']) === null || _u === void 0 ? void 0 : _u['big_file_unique_id'],
                                                small_file_id: (_x = (_w = (_v = res['result']) === null || _v === void 0 ? void 0 : _v['chat']) === null || _w === void 0 ? void 0 : _w['photo']) === null || _x === void 0 ? void 0 : _x['small_file_id'],
                                                small_file_unique_id: (_0 = (_z = (_y = res['result']) === null || _y === void 0 ? void 0 : _y['chat']) === null || _z === void 0 ? void 0 : _z['photo']) === null || _0 === void 0 ? void 0 : _0['small_file_unique_id'],
                                            }
                                        },
                                        from: {
                                            id: (_2 = (_1 = res['result']) === null || _1 === void 0 ? void 0 : _1['from']) === null || _2 === void 0 ? void 0 : _2['id'],
                                            is_bot: (_4 = (_3 = res['result']) === null || _3 === void 0 ? void 0 : _3['from']) === null || _4 === void 0 ? void 0 : _4['is_bot'],
                                            first_name: (_6 = (_5 = res['result']) === null || _5 === void 0 ? void 0 : _5['from']) === null || _6 === void 0 ? void 0 : _6['first_name'],
                                            last_name: (_8 = (_7 = res['result']) === null || _7 === void 0 ? void 0 : _7['from']) === null || _8 === void 0 ? void 0 : _8['last_name'],
                                            username: (_10 = (_9 = res['result']) === null || _9 === void 0 ? void 0 : _9['from']) === null || _10 === void 0 ? void 0 : _10['username'],
                                            language_code: (_12 = (_11 = res['result']) === null || _11 === void 0 ? void 0 : _11['from']) === null || _12 === void 0 ? void 0 : _12['language_code'],
                                        },
                                        contact: {
                                            first_name: (_14 = (_13 = res['result']) === null || _13 === void 0 ? void 0 : _13['contact']) === null || _14 === void 0 ? void 0 : _14['first_name'],
                                            last_name: (_16 = (_15 = res['result']) === null || _15 === void 0 ? void 0 : _15['contact']) === null || _16 === void 0 ? void 0 : _16['last_name'],
                                            phone_number: (_18 = (_17 = res['result']) === null || _17 === void 0 ? void 0 : _17['contact']) === null || _18 === void 0 ? void 0 : _18['phone_number'],
                                            user_id: (_20 = (_19 = res['result']) === null || _19 === void 0 ? void 0 : _19['contact']) === null || _20 === void 0 ? void 0 : _20['user_id']
                                        },
                                        text: undefined
                                    });
                                }
                                else {
                                    callback({ text: undefined });
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.getFile = function (fileId_1) {
        return __awaiter(this, arguments, void 0, function (fileId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("getFile", {
                            file_id: fileId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                if (res.ok) {
                                    ;
                                    callback({
                                        id: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['file_id'],
                                        unique_id: (_b = res['result']) === null || _b === void 0 ? void 0 : _b['file_unique_id'],
                                        size: (_c = res['result']) === null || _c === void 0 ? void 0 : _c['file_size'],
                                        path: (_d = res['result']) === null || _d === void 0 ? void 0 : _d['file_path']
                                    });
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.getFileContent = function (filePath_1) {
        return __awaiter(this, arguments, void 0, function (filePath, callback) {
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.fileConnection(filePath, function (s) {
                            if (typeof s === 'object' && s !== null && !Array.isArray(s)) {
                                callback({
                                    ok: false,
                                    error_message: s['message']
                                });
                            }
                            else {
                                callback({
                                    ok: true,
                                    data: s
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.getChat = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("getChat", { chat_id: chatId }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                            return __generator(this, function (_r) {
                                if (res.ok) {
                                    callback({
                                        first_name: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['first_name'],
                                        last_name: (_b = res['result']) === null || _b === void 0 ? void 0 : _b['last_name'],
                                        id: (_c = res['result']) === null || _c === void 0 ? void 0 : _c['id'],
                                        title: (_d = res['result']) === null || _d === void 0 ? void 0 : _d['title'],
                                        invite_link: (_e = res['result']) === null || _e === void 0 ? void 0 : _e['invite_link'],
                                        username: (_f = res['result']) === null || _f === void 0 ? void 0 : _f['username'],
                                        type: (_g = res['result']) === null || _g === void 0 ? void 0 : _g['type'],
                                        photo: {
                                            big_file_id: (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['photo']) === null || _j === void 0 ? void 0 : _j['big_file_id'],
                                            big_file_unique_id: (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['photo']) === null || _l === void 0 ? void 0 : _l['big_file_unique_id'],
                                            small_file_id: (_o = (_m = res['result']) === null || _m === void 0 ? void 0 : _m['photo']) === null || _o === void 0 ? void 0 : _o['small_file_id'],
                                            small_file_unique_id: (_q = (_p = res['result']) === null || _p === void 0 ? void 0 : _p['photo']) === null || _q === void 0 ? void 0 : _q['big_file_id'],
                                        }
                                    });
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.pinMessage = function (chatId_1, messageId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, messageId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("pinChatMessage", {
                            chat_id: chatId,
                            message_id: messageId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.unpinMessage = function (chatId_1, messageId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, messageId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("unpinChatMessage", {
                            chat_id: chatId,
                            message_id: messageId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.unpinAllMessage = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("unpinAllChatMessages", {
                            chat_id: chatId,
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.editMessageText = function (chatId_1, text_1, messageId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, text, messageId, options, callback) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("editMessageText", {
                            chat_id: chatId,
                            text: text,
                            message_id: messageId,
                            reply_markup: JSON.stringify({}[options.keyboard_mode] = options.reply_markup)
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                            return __generator(this, function (_v) {
                                if (res.ok) {
                                    callback({
                                        text: undefined,
                                        id: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['message_id'],
                                        date: (_b = res['result']) === null || _b === void 0 ? void 0 : _b['date'],
                                        edit_date: (_c = res['result']) === null || _c === void 0 ? void 0 : _c['edit_date'],
                                        chat: {
                                            id: (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['chat']) === null || _e === void 0 ? void 0 : _e['id'],
                                            type: (_g = (_f = res['result']) === null || _f === void 0 ? void 0 : _f['chat']) === null || _g === void 0 ? void 0 : _g['type'],
                                            photo: {
                                                big_file_id: (_k = (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['chat']) === null || _j === void 0 ? void 0 : _j['photo']) === null || _k === void 0 ? void 0 : _k['big_file_id'],
                                                big_file_unique_id: (_o = (_m = (_l = res['result']) === null || _l === void 0 ? void 0 : _l['chat']) === null || _m === void 0 ? void 0 : _m['photo']) === null || _o === void 0 ? void 0 : _o['big_file_unique_id'],
                                                small_file_id: (_r = (_q = (_p = res['result']) === null || _p === void 0 ? void 0 : _p['chat']) === null || _q === void 0 ? void 0 : _q['photo']) === null || _r === void 0 ? void 0 : _r['small_file_id'],
                                                small_file_unique_id: (_u = (_t = (_s = res['result']) === null || _s === void 0 ? void 0 : _s['chat']) === null || _t === void 0 ? void 0 : _t['photo']) === null || _u === void 0 ? void 0 : _u['small_file_unique_id']
                                            }
                                        }
                                    });
                                }
                                else {
                                    callback({ text: undefined });
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.createInviteLink = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("createChatInviteLink", {
                            chat_id: chatId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                            return __generator(this, function (_u) {
                                if (res.ok) {
                                    callback({
                                        invite_link: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['invite_link'],
                                        creator: {
                                            id: (_c = (_b = res['result']) === null || _b === void 0 ? void 0 : _b['creator']) === null || _c === void 0 ? void 0 : _c['id'],
                                            is_bot: (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['creator']) === null || _e === void 0 ? void 0 : _e['is_bot'],
                                            first_name: (_g = (_f = res['result']) === null || _f === void 0 ? void 0 : _f['creator']) === null || _g === void 0 ? void 0 : _g['first_name'],
                                            username: (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['creator']) === null || _j === void 0 ? void 0 : _j['username'],
                                            last_name: (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['creator']) === null || _l === void 0 ? void 0 : _l['last_name']
                                        },
                                        creates_join_request: (_m = res['result']) === null || _m === void 0 ? void 0 : _m['creates_join_request'],
                                        is_primary: (_o = res['result']) === null || _o === void 0 ? void 0 : _o['is_primary'],
                                        is_revoked: (_p = res['result']) === null || _p === void 0 ? void 0 : _p['is_revoked'],
                                        name: (_q = res['result']) === null || _q === void 0 ? void 0 : _q['name'],
                                        expire_date: (_r = res['result']) === null || _r === void 0 ? void 0 : _r['expire_date'],
                                        member_limit: (_s = res['result']) === null || _s === void 0 ? void 0 : _s['member_limit'],
                                        pending_join_request_count: (_t = res['result']) === null || _t === void 0 ? void 0 : _t['pending_join_request_count']
                                    });
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.revokeInviteLink = function (chatId_1, previousInviteLink_1) {
        return __awaiter(this, arguments, void 0, function (chatId, previousInviteLink, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("revokeChatInviteLink", {
                            chat_id: chatId,
                            invite_link: previousInviteLink
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                            return __generator(this, function (_u) {
                                if (res.ok) {
                                    callback({
                                        invite_link: (_a = res['result']) === null || _a === void 0 ? void 0 : _a['invite_link'],
                                        creator: {
                                            id: (_c = (_b = res['result']) === null || _b === void 0 ? void 0 : _b['creator']) === null || _c === void 0 ? void 0 : _c['id'],
                                            is_bot: (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['creator']) === null || _e === void 0 ? void 0 : _e['is_bot'],
                                            first_name: (_g = (_f = res['result']) === null || _f === void 0 ? void 0 : _f['creator']) === null || _g === void 0 ? void 0 : _g['first_name'],
                                            username: (_j = (_h = res['result']) === null || _h === void 0 ? void 0 : _h['creator']) === null || _j === void 0 ? void 0 : _j['username'],
                                            last_name: (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['creator']) === null || _l === void 0 ? void 0 : _l['last_name']
                                        },
                                        creates_join_request: (_m = res['result']) === null || _m === void 0 ? void 0 : _m['creates_join_request'],
                                        is_primary: (_o = res['result']) === null || _o === void 0 ? void 0 : _o['is_primary'],
                                        is_revoked: (_p = res['result']) === null || _p === void 0 ? void 0 : _p['is_revoked'],
                                        name: (_q = res['result']) === null || _q === void 0 ? void 0 : _q['name'],
                                        expire_date: (_r = res['result']) === null || _r === void 0 ? void 0 : _r['expire_date'],
                                        member_limit: (_s = res['result']) === null || _s === void 0 ? void 0 : _s['member_limit'],
                                        pending_join_request_count: (_t = res['result']) === null || _t === void 0 ? void 0 : _t['pending_join_request_count']
                                    });
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.exportInviteLink = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("exportChatInviteLink", {
                            chat_id: chatId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res['result']);
                                }
                                else {
                                    callback(undefined);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.deleteMessage = function (chatId_1, messageId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, messageId, callback) {
            var msgids_1, _loop_1, this_1, _i, messageId_2, mid;
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof messageId == "number")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.request.makeConnection("deleteMessage", {
                                chat_id: chatId,
                                message_id: messageId
                            }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (res.ok) {
                                        callback(res.result);
                                    }
                                    else {
                                        callback(false);
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        if (!Array.isArray(messageId)) return [3 /*break*/, 7];
                        msgids_1 = {};
                        _loop_1 = function (mid) {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.request.makeConnection("deleteMessage", {
                                            chat_id: chatId,
                                            message_id: mid
                                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (res.ok) {
                                                    Object.defineProperty(msgids_1, mid, {
                                                        value: res.result,
                                                        enumerable: true,
                                                        configurable: true,
                                                        writable: true
                                                    });
                                                }
                                                else {
                                                    Object.defineProperty(msgids_1, mid, {
                                                        value: false,
                                                        enumerable: true,
                                                        configurable: true,
                                                        writable: true
                                                    });
                                                    this.emit("fumble", res.description, res.error_code);
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, messageId_2 = messageId;
                        _a.label = 3;
                    case 3:
                        if (!(_i < messageId_2.length)) return [3 /*break*/, 6];
                        mid = messageId_2[_i];
                        return [5 /*yield**/, _loop_1(mid)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        callback(msgids_1);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.createNewStickerSet = function (userId_1, name_1, title_1, sticker_1) {
        return __awaiter(this, arguments, void 0, function (userId, name, title, sticker, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("createNewStickerSet", {
                            user_id: userId,
                            name: name,
                            title: title,
                            sticker: sticker
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.banChatMember = function (chatId_1, userId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, userId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("banChatMember", {
                            chat_id: chatId,
                            user_id: userId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.unbanChatMember = function (chatId_1, userId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, userId, onlyIfBanned, callback) {
            var _this = this;
            if (onlyIfBanned === void 0) { onlyIfBanned = true; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("unbanChatMember", {
                            chat_id: chatId,
                            user_id: userId,
                            only_if_banned: onlyIfBanned
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param chatId
     * @param userId
     * @param promotion
     * @param callback
     * @abstract Says chat id is empty, after fixing the servers, we will fix this method
     */
    BaleBot.prototype.promoteChatMember = function (chatId_1, userId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, userId, promotion, callback) {
            var _this = this;
            if (promotion === void 0) { promotion = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("promoteChatMember", {
                            chat_id: chatId,
                            user_id: userId,
                            can_change_info: promotion.can_change_info,
                            can_post_messages: promotion.can_post_messages,
                            can_edit_messages: promotion.can_edit_messages,
                            can_delete_messages: promotion.can_delete_messages,
                            can_manage_video_chats: promotion.can_manage_video_chats,
                            can_invite_users: promotion.can_invite_users,
                            can_restrict_members: promotion.can_restrict_members
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res);
                                }
                                else {
                                    callback(res);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param chatId
     * @param photo
     * @param callback
     * @abstract Says Internal server error, after fixing the servers, we will fix this method
     */
    BaleBot.prototype.setChatPhoto = function (chatId_1, photo_1) {
        return __awaiter(this, arguments, void 0, function (chatId, photo, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.link_url_regex.test(photo)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.request.makeConnection("setChatPhoto", {
                                chat_id: chatId,
                                photo: photo
                            }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (res.ok) {
                                        callback(res);
                                    }
                                    else {
                                        callback(res);
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(0, fs_1.existsSync)(photo)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.request.setChatPhoto(photo, chatId, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (res.ok) {
                                        callback(res);
                                    }
                                    else {
                                        callback(res);
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.leaveChat = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("leaveChat", {
                            chat_id: chatId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.setChatTitle = function (chatId_1, title_1) {
        return __awaiter(this, arguments, void 0, function (chatId, title, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("setChatTitle", {
                            chat_id: chatId,
                            title: title
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.setChatDescription = function (chatId_1, description_1) {
        return __awaiter(this, arguments, void 0, function (chatId, description, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("setChatDescription", {
                            chat_id: chatId,
                            description: description
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.deleteChatPhoto = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("deleteChatPhoto", {
                            chat_id: chatId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(false);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.getChatMembersCount = function (chatId_1) {
        return __awaiter(this, arguments, void 0, function (chatId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("getChatMembersCount", {
                            chat_id: chatId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res.result);
                                }
                                else {
                                    callback(-1);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.replyTo = function (message_1, text_1) {
        return __awaiter(this, arguments, void 0, function (message, text, options, callback) {
            var _, __;
            var _this = this;
            if (options === void 0) { options = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _ = options.keyboard_mode;
                        __ = {};
                        __[_] = options.reply_markup;
                        return [4 /*yield*/, this.request.makeConnection("sendMessage", {
                                chat_id: message.chat.id,
                                text: text,
                                reply_to_message_id: message.id,
                                reply_markup: JSON.stringify(__)
                            }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                return __generator(this, function (_o) {
                                    if (res.ok) {
                                        callback({
                                            text: text,
                                            from: {
                                                id: res.result.from['id'],
                                                is_bot: res.result.from['is_bot'],
                                                first_name: res.result.from['first_name'],
                                                last_name: res.result.from['last_name'],
                                                username: res.result.from['username'],
                                                language_code: res.result.from['language_code']
                                            },
                                            id: res.result['message_id'],
                                            date: res.result['date'],
                                            chat: {
                                                id: res.result.chat['id'],
                                                type: res.result.chat['type'],
                                                photo: {
                                                    big_file_id: (_c = (_b = (_a = res['result']) === null || _a === void 0 ? void 0 : _a['chat']) === null || _b === void 0 ? void 0 : _b['photo']) === null || _c === void 0 ? void 0 : _c['big_file_id'],
                                                    big_file_unique_id: (_f = (_e = (_d = res['result']) === null || _d === void 0 ? void 0 : _d['chat']) === null || _e === void 0 ? void 0 : _e['photo']) === null || _f === void 0 ? void 0 : _f['big_file_unique_id'],
                                                    small_file_id: (_j = (_h = (_g = res['result']) === null || _g === void 0 ? void 0 : _g['chat']) === null || _h === void 0 ? void 0 : _h['photo']) === null || _j === void 0 ? void 0 : _j['small_file_id'],
                                                    small_file_unique_id: (_m = (_l = (_k = res['result']) === null || _k === void 0 ? void 0 : _k['chat']) === null || _l === void 0 ? void 0 : _l['photo']) === null || _m === void 0 ? void 0 : _m['small_file_unique_id'],
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        callback({ text: undefined });
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.setWebhook = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof args[0] == "string" && typeof args[1] == "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, new connection_1.Connection(args[1]).makeConnection("setWebhook", { url: args[0] }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (res.ok) {
                                        args[2](res);
                                    }
                                    else {
                                        args[2]({});
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.request.makeConnection("setWebhook", { url: args[0] }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    args[1](res);
                                }
                                else {
                                    args[1]({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.deleteWebhook = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof args[0] == "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, new connection_1.Connection(args[0]).makeConnection("setWebhook", { url: "" }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (res.ok) {
                                        args[1](res);
                                    }
                                    else {
                                        args[1]({});
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.request.makeConnection("setWebhook", { url: "" }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    args[0](res);
                                }
                                else {
                                    args[0]({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.getWebhookInfo = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof args[0] == "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, new connection_1.Connection(args[0]).makeConnection("getWebhookInfo", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    if (res.ok) {
                                        args[1]({
                                            url: (_a = res.result) === null || _a === void 0 ? void 0 : _a.url,
                                            has_custom_certificate: (_b = res.result) === null || _b === void 0 ? void 0 : _b.has_custom_certificate,
                                            pending_update_count: (_c = res.result) === null || _c === void 0 ? void 0 : _c.pending_update_count
                                        });
                                    }
                                    else {
                                        args[1]({});
                                        this.emit("fumble", res.description, res.error_code);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.request.makeConnection("getWebhookInfo", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                if (res.ok) {
                                    args[0]({
                                        url: (_a = res.result) === null || _a === void 0 ? void 0 : _a.url,
                                        has_custom_certificate: (_b = res.result) === null || _b === void 0 ? void 0 : _b.has_custom_certificate,
                                        pending_update_count: (_c = res.result) === null || _c === void 0 ? void 0 : _c.pending_update_count
                                    });
                                }
                                else {
                                    args[0]({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.copyMessage = function (fromChatId_1, toChatId_1, messageId_1) {
        return __awaiter(this, arguments, void 0, function (fromChatId, toChatId, messageId, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("copyMessage", {
                            from_chat_id: fromChatId,
                            chat_id: toChatId,
                            message_id: messageId
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
                            return __generator(this, function (_16) {
                                if (res.ok) {
                                    callback({
                                        date: (_a = res.result) === null || _a === void 0 ? void 0 : _a.date,
                                        message_id: (_b = res.result) === null || _b === void 0 ? void 0 : _b.message_id,
                                        from: {
                                            id: (_d = (_c = res.result) === null || _c === void 0 ? void 0 : _c.from) === null || _d === void 0 ? void 0 : _d.id,
                                            is_bot: (_f = (_e = res.result) === null || _e === void 0 ? void 0 : _e.from) === null || _f === void 0 ? void 0 : _f.is_bot,
                                            first_name: (_h = (_g = res.result) === null || _g === void 0 ? void 0 : _g.from) === null || _h === void 0 ? void 0 : _h.first_name,
                                            last_name: (_k = (_j = res.result) === null || _j === void 0 ? void 0 : _j.from) === null || _k === void 0 ? void 0 : _k.last_name,
                                            username: (_m = (_l = res.result) === null || _l === void 0 ? void 0 : _l.from) === null || _m === void 0 ? void 0 : _m.username,
                                            language_code: (_p = (_o = res.result) === null || _o === void 0 ? void 0 : _o.from) === null || _p === void 0 ? void 0 : _p.language_code
                                        },
                                        chat: {
                                            id: (_r = (_q = res.result) === null || _q === void 0 ? void 0 : _q.chat) === null || _r === void 0 ? void 0 : _r.id,
                                            type: (_t = (_s = res.result) === null || _s === void 0 ? void 0 : _s.chat) === null || _t === void 0 ? void 0 : _t.private,
                                            title: (_v = (_u = res.result) === null || _u === void 0 ? void 0 : _u.chat) === null || _v === void 0 ? void 0 : _v.title,
                                            first_name: (_x = (_w = res.result) === null || _w === void 0 ? void 0 : _w.chat) === null || _x === void 0 ? void 0 : _x.first_name,
                                            last_name: (_z = (_y = res.result) === null || _y === void 0 ? void 0 : _y.chat) === null || _z === void 0 ? void 0 : _z.last_name,
                                            invite_link: (_1 = (_0 = res.result) === null || _0 === void 0 ? void 0 : _0.chat) === null || _1 === void 0 ? void 0 : _1.invite_link,
                                            username: (_3 = (_2 = res.result) === null || _2 === void 0 ? void 0 : _2.chat) === null || _3 === void 0 ? void 0 : _3.username,
                                            photo: {
                                                big_file_id: (_6 = (_5 = (_4 = res.result) === null || _4 === void 0 ? void 0 : _4.chat) === null || _5 === void 0 ? void 0 : _5.photo) === null || _6 === void 0 ? void 0 : _6.big_file_id,
                                                big_file_unique_id: (_9 = (_8 = (_7 = res.result) === null || _7 === void 0 ? void 0 : _7.chat) === null || _8 === void 0 ? void 0 : _8.photo) === null || _9 === void 0 ? void 0 : _9.big_file_unique_id,
                                                small_file_id: (_12 = (_11 = (_10 = res.result) === null || _10 === void 0 ? void 0 : _10.chat) === null || _11 === void 0 ? void 0 : _11.photo) === null || _12 === void 0 ? void 0 : _12.small_file_id,
                                                small_file_unique_id: (_15 = (_14 = (_13 = res.result) === null || _13 === void 0 ? void 0 : _13.chat) === null || _14 === void 0 ? void 0 : _14.photo) === null || _15 === void 0 ? void 0 : _15.small_file_unique_id
                                            }
                                        }
                                    });
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.sendMediaGroup = function (chatId_1, mediaList_1) {
        return __awaiter(this, arguments, void 0, function (chatId, mediaList, options, callback) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnectionMultiPart("sendMediaGroup", {
                            chat_id: chatId,
                            media: mediaList.media,
                            reply_to_message_id: options.reply_to_message_id
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var cops_1;
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    cops_1 = [];
                                    res.result.forEach(function (obj) {
                                        var message_id = obj.message_id, from = obj.from, date = obj.date, chat = obj.chat, media_group_id = obj.media_group_id;
                                        cops_1.push({
                                            message_id: message_id,
                                            from: from,
                                            chat: chat,
                                            date: date,
                                            media_group_id: media_group_id
                                        });
                                    });
                                    callback(cops_1);
                                }
                                else {
                                    callback([]);
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.answerCallbackQuery = function (callbackQueryId_1) {
        return __awaiter(this, arguments, void 0, function (callbackQueryId, options, callback) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (callback === void 0) { callback = function () { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.makeConnection("answerCallbackQuery", {
                            callback_query_id: callbackQueryId,
                            text: options.text,
                            show_alert: options.show_alert
                        }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.ok) {
                                    callback(res);
                                }
                                else {
                                    callback({});
                                    this.emit("fumble", res.description, res.error_code);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaleBot.prototype.poll = function (intervalTime) {
        return __awaiter(this, void 0, void 0, function () {
            var mesids, clids, interval;
            var _this = this;
            return __generator(this, function (_a) {
                mesids = [];
                clids = [];
                interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var evs;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                evs = this.eventNames();
                                if (!evs.includes("close")) return [3 /*break*/, 1];
                                if (this.intervalId !== -1) {
                                    clearInterval(this.intervalId);
                                    this.emit("close");
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (!(evs.includes("message") ||
                                    evs.includes("photo") ||
                                    evs.includes("video") ||
                                    evs.includes("audio") ||
                                    evs.includes("voice") ||
                                    evs.includes("sticker") ||
                                    evs.includes("document"))) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.request.makeConnection("getUpdates", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        var indexes, last_index, last_update, photos, replyPhotos, phs_4, rephs_1, news, replyNews, nws_1, renws_1, m;
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166, _167, _168, _169, _170, _171, _172, _173, _174, _175, _176, _177, _178, _179, _180, _181, _182, _183, _184, _185, _186, _187, _188, _189, _190, _191, _192, _193, _194, _195, _196, _197, _198, _199, _200, _201, _202, _203, _204, _205, _206, _207, _208, _209, _210, _211, _212, _213, _214, _215, _216, _217, _218, _219, _220, _221, _222, _223, _224, _225, _226, _227, _228, _229, _230, _231, _232, _233, _234, _235, _236, _237, _238, _239;
                                        return __generator(this, function (_240) {
                                            if (res.ok) {
                                                indexes = (_a = res['result']) !== null && _a !== void 0 ? _a : [{}];
                                                last_index = indexes.length - 1;
                                                if (Object.keys(indexes[last_index]).includes("message") === true) {
                                                    last_update = indexes[last_index]['message'];
                                                    if (!(last_update['date'] <= Math.max.apply(Math, mesids))) {
                                                        photos = (_b = last_update['photo']) !== null && _b !== void 0 ? _b : [];
                                                        replyPhotos = (_d = (_c = last_update['reply_to_message']) === null || _c === void 0 ? void 0 : _c['photo']) !== null && _d !== void 0 ? _d : [];
                                                        phs_4 = [];
                                                        photos.forEach(function (photo) {
                                                            var file_id = photo.file_id, file_unique_id = photo.file_unique_id, width = photo.width, height = photo.height, file_size = photo.file_size;
                                                            phs_4.push({
                                                                file_id: file_id,
                                                                file_unique_id: file_unique_id,
                                                                width: width,
                                                                height: height,
                                                                file_size: file_size
                                                            });
                                                        });
                                                        rephs_1 = [];
                                                        replyPhotos.forEach(function (photo) {
                                                            var file_id = photo.file_id, file_unique_id = photo.file_unique_id, width = photo.width, height = photo.height, file_size = photo.file_size;
                                                            rephs_1.push({
                                                                file_id: file_id,
                                                                file_unique_id: file_unique_id,
                                                                width: width,
                                                                height: height,
                                                                file_size: file_size
                                                            });
                                                        });
                                                        news = (_e = last_update['new_chat_members']) !== null && _e !== void 0 ? _e : [];
                                                        replyNews = (_g = (_f = last_update['reply_to_message']) === null || _f === void 0 ? void 0 : _f['new_chat_members']) !== null && _g !== void 0 ? _g : [];
                                                        nws_1 = [];
                                                        news.forEach(function (user) {
                                                            var first_name = user.first_name, last_name = user.last_name, id = user.id, username = user.username, language_code = user.language_code, is_bot = user.is_bot;
                                                            nws_1.push({
                                                                first_name: first_name,
                                                                last_name: last_name,
                                                                id: id,
                                                                username: username,
                                                                is_bot: is_bot,
                                                                language_code: language_code
                                                            });
                                                        });
                                                        renws_1 = [];
                                                        replyNews.forEach(function (user) {
                                                            var first_name = user.first_name, last_name = user.last_name, id = user.id, username = user.username, language_code = user.language_code, is_bot = user.is_bot;
                                                            renws_1.push({
                                                                first_name: first_name,
                                                                last_name: last_name,
                                                                id: id,
                                                                username: username,
                                                                is_bot: is_bot,
                                                                language_code: language_code
                                                            });
                                                        });
                                                        m = {
                                                            text: last_update['text'],
                                                            id: last_update['message_id'],
                                                            from: {
                                                                id: (_h = last_update['from']) === null || _h === void 0 ? void 0 : _h['id'],
                                                                is_bot: (_j = last_update['from']) === null || _j === void 0 ? void 0 : _j['is_bot'],
                                                                first_name: (_k = last_update['from']) === null || _k === void 0 ? void 0 : _k['first_name'],
                                                                last_name: (_l = last_update['from']) === null || _l === void 0 ? void 0 : _l['last_name'],
                                                                username: (_m = last_update['from']) === null || _m === void 0 ? void 0 : _m['username'],
                                                                language_code: (_o = last_update['from']) === null || _o === void 0 ? void 0 : _o['language_code']
                                                            },
                                                            date: last_update['date'],
                                                            chat: {
                                                                id: (_p = last_update['chat']) === null || _p === void 0 ? void 0 : _p['id'],
                                                                first_name: (_q = last_update['chat']) === null || _q === void 0 ? void 0 : _q['first_name'],
                                                                photo: {
                                                                    small_file_id: (_s = (_r = last_update['chat']) === null || _r === void 0 ? void 0 : _r['photo']) === null || _s === void 0 ? void 0 : _s['small_file_id'],
                                                                    small_file_unique_id: (_u = (_t = last_update['chat']) === null || _t === void 0 ? void 0 : _t['photo']) === null || _u === void 0 ? void 0 : _u['small_file_unique_id'],
                                                                    big_file_id: (_w = (_v = last_update['chat']) === null || _v === void 0 ? void 0 : _v['photo']) === null || _w === void 0 ? void 0 : _w['big_file_id'],
                                                                    big_file_unique_id: (_y = (_x = last_update['chat']) === null || _x === void 0 ? void 0 : _x['photo']) === null || _y === void 0 ? void 0 : _y['big_file_unique_id']
                                                                },
                                                                type: (_z = last_update['chat']) === null || _z === void 0 ? void 0 : _z['type'],
                                                                title: (_0 = last_update['chat']) === null || _0 === void 0 ? void 0 : _0['title'],
                                                                username: (_1 = last_update['chat']) === null || _1 === void 0 ? void 0 : _1['username'],
                                                                invite_link: (_2 = last_update['chat']) === null || _2 === void 0 ? void 0 : _2['invite_link']
                                                            },
                                                            forward_from: {
                                                                id: (_3 = last_update['forward_from']) === null || _3 === void 0 ? void 0 : _3['id'],
                                                                is_bot: (_4 = last_update['forward_from']) === null || _4 === void 0 ? void 0 : _4['is_bot'],
                                                                first_name: (_5 = last_update['forward_from']) === null || _5 === void 0 ? void 0 : _5['first_name'],
                                                                last_name: (_6 = last_update['forward_from']) === null || _6 === void 0 ? void 0 : _6['last_name'],
                                                                username: (_7 = last_update['forward_from']) === null || _7 === void 0 ? void 0 : _7['username'],
                                                                language_code: (_8 = last_update['forward_from']) === null || _8 === void 0 ? void 0 : _8['language_code']
                                                            },
                                                            forward_from_message_id: last_update['forward_from_message_id'],
                                                            edit_date: last_update['edit_date'],
                                                            document: {
                                                                file_id: (_9 = last_update['document']) === null || _9 === void 0 ? void 0 : _9['file_id'],
                                                                file_unique_id: (_10 = last_update['document']) === null || _10 === void 0 ? void 0 : _10['file_unique_id'],
                                                                file_name: (_11 = last_update['document']) === null || _11 === void 0 ? void 0 : _11['file_name'],
                                                                mime_type: (_12 = last_update['document']) === null || _12 === void 0 ? void 0 : _12['mime_type'],
                                                                file_size: (_13 = last_update['document']) === null || _13 === void 0 ? void 0 : _13['file_size']
                                                            },
                                                            photo: phs_4,
                                                            video: {
                                                                file_id: (_14 = last_update['video']) === null || _14 === void 0 ? void 0 : _14['file_id'],
                                                                file_unique_id: (_15 = last_update['video']) === null || _15 === void 0 ? void 0 : _15['file_unique_id'],
                                                                width: (_16 = last_update['video']) === null || _16 === void 0 ? void 0 : _16['width'],
                                                                height: (_17 = last_update['video']) === null || _17 === void 0 ? void 0 : _17['height'],
                                                                duration: (_18 = last_update['video']) === null || _18 === void 0 ? void 0 : _18['duration'],
                                                                mime_type: (_19 = last_update['video']) === null || _19 === void 0 ? void 0 : _19['mime_type'],
                                                                file_size: (_20 = last_update['video']) === null || _20 === void 0 ? void 0 : _20['file_size']
                                                            },
                                                            audio: {
                                                                file_id: (_21 = last_update['audio']) === null || _21 === void 0 ? void 0 : _21['file_id'],
                                                                file_unique_id: (_22 = last_update['audio']) === null || _22 === void 0 ? void 0 : _22['file_unique_id'],
                                                                duration: (_23 = last_update['audio']) === null || _23 === void 0 ? void 0 : _23['duration'],
                                                                mime_type: (_24 = last_update['audio']) === null || _24 === void 0 ? void 0 : _24['mime_type'],
                                                                file_size: (_25 = last_update['audio']) === null || _25 === void 0 ? void 0 : _25['file_size']
                                                            },
                                                            voice: {
                                                                file_id: (_26 = last_update['voice']) === null || _26 === void 0 ? void 0 : _26['file_id'],
                                                                file_unique_id: (_27 = last_update['voice']) === null || _27 === void 0 ? void 0 : _27['file_unique_id'],
                                                                duration: (_28 = last_update['voice']) === null || _28 === void 0 ? void 0 : _28['duration'],
                                                                mime_type: (_29 = last_update['voice']) === null || _29 === void 0 ? void 0 : _29['mime_type'],
                                                                file_size: (_30 = last_update['voice']) === null || _30 === void 0 ? void 0 : _30['file_size']
                                                            },
                                                            caption: last_update['caption'],
                                                            contact: {
                                                                phone_number: (_31 = last_update['contact']) === null || _31 === void 0 ? void 0 : _31['phone_number'],
                                                                first_name: (_32 = last_update['contact']) === null || _32 === void 0 ? void 0 : _32['first_name'],
                                                                user_id: (_33 = last_update['contact']) === null || _33 === void 0 ? void 0 : _33['user_id']
                                                            },
                                                            location: {
                                                                latitude: (_34 = last_update['location']) === null || _34 === void 0 ? void 0 : _34['latitude'],
                                                                longitude: (_35 = last_update['location']) === null || _35 === void 0 ? void 0 : _35['longitude']
                                                            },
                                                            sticker: {
                                                                file_id: (_36 = last_update['sticker']) === null || _36 === void 0 ? void 0 : _36['file_id'],
                                                                file_unique_id: (_37 = last_update['sticker']) === null || _37 === void 0 ? void 0 : _37['file_unique_id'],
                                                                type: (_38 = last_update['sticker']) === null || _38 === void 0 ? void 0 : _38['type'],
                                                                width: (_39 = last_update['sticker']) === null || _39 === void 0 ? void 0 : _39['width'],
                                                                height: (_40 = last_update['sticker']) === null || _40 === void 0 ? void 0 : _40['height'],
                                                                is_animated: (_41 = last_update['sticker']) === null || _41 === void 0 ? void 0 : _41['is_animated'],
                                                                is_video: (_42 = last_update['sticker']) === null || _42 === void 0 ? void 0 : _42['is_video'],
                                                                thumbnail: {
                                                                    file_id: (_44 = (_43 = last_update['sticker']) === null || _43 === void 0 ? void 0 : _43['thumb']) === null || _44 === void 0 ? void 0 : _44['file_id'],
                                                                    file_unique_id: (_46 = (_45 = last_update['sticker']) === null || _45 === void 0 ? void 0 : _45['thumb']) === null || _46 === void 0 ? void 0 : _46['file_unique_id'],
                                                                    file_size: (_48 = (_47 = last_update['sticker']) === null || _47 === void 0 ? void 0 : _47['thumb']) === null || _48 === void 0 ? void 0 : _48['file_id'],
                                                                    width: (_50 = (_49 = last_update['sticker']) === null || _49 === void 0 ? void 0 : _49['thumb']) === null || _50 === void 0 ? void 0 : _50['width'],
                                                                    height: (_52 = (_51 = last_update['sticker']) === null || _51 === void 0 ? void 0 : _51['thumb']) === null || _52 === void 0 ? void 0 : _52['height']
                                                                },
                                                                set_name: (_53 = last_update['sticker']) === null || _53 === void 0 ? void 0 : _53['set_name'],
                                                                file_size: (_54 = last_update['sticker']) === null || _54 === void 0 ? void 0 : _54['file_size']
                                                            },
                                                            left_chat_member: {
                                                                id: (_55 = last_update['left_chat_member']) === null || _55 === void 0 ? void 0 : _55['id'],
                                                                is_bot: (_56 = last_update['left_chat_member']) === null || _56 === void 0 ? void 0 : _56['is_bot'],
                                                                first_name: (_57 = last_update['left_chat_member']) === null || _57 === void 0 ? void 0 : _57['first_name'],
                                                                last_name: (_58 = last_update['left_chat_member']) === null || _58 === void 0 ? void 0 : _58['last_name'],
                                                                username: (_59 = last_update['left_chat_member']) === null || _59 === void 0 ? void 0 : _59['username'],
                                                                language_code: (_60 = last_update['left_chat_member']) === null || _60 === void 0 ? void 0 : _60['language_code'],
                                                            },
                                                            new_chat_members: nws_1,
                                                            successful_payment: last_update['successful_payment'],
                                                            invoice: {
                                                                chat_id: (_61 = last_update['invoice']) === null || _61 === void 0 ? void 0 : _61['chat_id'],
                                                                title: (_62 = last_update['invoice']) === null || _62 === void 0 ? void 0 : _62['title'],
                                                                description: (_63 = last_update['invoice']) === null || _63 === void 0 ? void 0 : _63['description'],
                                                                payload: (_64 = last_update['invoice']) === null || _64 === void 0 ? void 0 : _64['payload'],
                                                                provider_token: (_65 = last_update['invoice']) === null || _65 === void 0 ? void 0 : _65['provider_token'],
                                                                photo_url: (_66 = last_update['invoice']) === null || _66 === void 0 ? void 0 : _66['photo_url'],
                                                                reply_to_message_id: (_67 = last_update['invoice']) === null || _67 === void 0 ? void 0 : _67['reply_to_message_id'],
                                                                reply_markup: (_68 = last_update['invoice']) === null || _68 === void 0 ? void 0 : _68['reply_markup'],
                                                                prices: (_69 = last_update['invoice']) === null || _69 === void 0 ? void 0 : _69['prices']
                                                            },
                                                            reply_to_message: {
                                                                text: (_70 = last_update['reply_to_message']) === null || _70 === void 0 ? void 0 : _70['text'],
                                                                id: (_71 = last_update['reply_to_message']) === null || _71 === void 0 ? void 0 : _71['message_id'],
                                                                date: (_72 = last_update['reply_to_message']) === null || _72 === void 0 ? void 0 : _72['date'],
                                                                from: {
                                                                    first_name: (_74 = (_73 = last_update['reply_to_message']) === null || _73 === void 0 ? void 0 : _73['from']) === null || _74 === void 0 ? void 0 : _74['first_name'],
                                                                    last_name: (_76 = (_75 = last_update['reply_to_message']) === null || _75 === void 0 ? void 0 : _75['from']) === null || _76 === void 0 ? void 0 : _76['last_name'],
                                                                    username: (_78 = (_77 = last_update['reply_to_message']) === null || _77 === void 0 ? void 0 : _77['from']) === null || _78 === void 0 ? void 0 : _78['username'],
                                                                    id: (_80 = (_79 = last_update['reply_to_message']) === null || _79 === void 0 ? void 0 : _79['from']) === null || _80 === void 0 ? void 0 : _80['id'],
                                                                    language_code: (_82 = (_81 = last_update['reply_to_message']) === null || _81 === void 0 ? void 0 : _81['from']) === null || _82 === void 0 ? void 0 : _82['language_code']
                                                                },
                                                                chat: {
                                                                    id: (_84 = (_83 = last_update['reply_to_message']) === null || _83 === void 0 ? void 0 : _83['chat']) === null || _84 === void 0 ? void 0 : _84['id'],
                                                                    type: (_86 = (_85 = last_update['reply_to_message']) === null || _85 === void 0 ? void 0 : _85['chat']) === null || _86 === void 0 ? void 0 : _86['type'],
                                                                    title: (_88 = (_87 = last_update['reply_to_message']) === null || _87 === void 0 ? void 0 : _87['chat']) === null || _88 === void 0 ? void 0 : _88['title'],
                                                                    username: (_90 = (_89 = last_update['reply_to_message']) === null || _89 === void 0 ? void 0 : _89['chat']) === null || _90 === void 0 ? void 0 : _90['username'],
                                                                    first_name: (_92 = (_91 = last_update['reply_to_message']) === null || _91 === void 0 ? void 0 : _91['chat']) === null || _92 === void 0 ? void 0 : _92['first_name'],
                                                                    last_name: (_94 = (_93 = last_update['reply_to_message']) === null || _93 === void 0 ? void 0 : _93['chat']) === null || _94 === void 0 ? void 0 : _94['last_name'],
                                                                    photo: {
                                                                        small_file_id: (_97 = (_96 = (_95 = last_update['reply_to_message']) === null || _95 === void 0 ? void 0 : _95['chat']) === null || _96 === void 0 ? void 0 : _96['photo']) === null || _97 === void 0 ? void 0 : _97['small_file_id'],
                                                                        small_file_unique_id: (_100 = (_99 = (_98 = last_update['reply_to_message']) === null || _98 === void 0 ? void 0 : _98['chat']) === null || _99 === void 0 ? void 0 : _99['photo']) === null || _100 === void 0 ? void 0 : _100['small_file_unique_id'],
                                                                        big_file_id: (_103 = (_102 = (_101 = last_update['reply_to_message']) === null || _101 === void 0 ? void 0 : _101['chat']) === null || _102 === void 0 ? void 0 : _102['photo']) === null || _103 === void 0 ? void 0 : _103['big_file_id'],
                                                                        big_file_unique_id: (_106 = (_105 = (_104 = last_update['reply_to_message']) === null || _104 === void 0 ? void 0 : _104['chat']) === null || _105 === void 0 ? void 0 : _105['photo']) === null || _106 === void 0 ? void 0 : _106['small_file_id'],
                                                                    }
                                                                },
                                                                forward_from: {
                                                                    id: (_108 = (_107 = last_update['reply_to_message']) === null || _107 === void 0 ? void 0 : _107['forward_from']) === null || _108 === void 0 ? void 0 : _108['id'],
                                                                    is_bot: (_110 = (_109 = last_update['reply_to_message']) === null || _109 === void 0 ? void 0 : _109['forward_from']) === null || _110 === void 0 ? void 0 : _110['is_bot'],
                                                                    first_name: (_112 = (_111 = last_update['reply_to_message']) === null || _111 === void 0 ? void 0 : _111['forward_from']) === null || _112 === void 0 ? void 0 : _112['first_name'],
                                                                    last_name: (_114 = (_113 = last_update['reply_to_message']) === null || _113 === void 0 ? void 0 : _113['forward_from']) === null || _114 === void 0 ? void 0 : _114['last_name'],
                                                                    username: (_116 = (_115 = last_update['reply_to_message']) === null || _115 === void 0 ? void 0 : _115['forward_from']) === null || _116 === void 0 ? void 0 : _116['username'],
                                                                    language_code: (_118 = (_117 = last_update['reply_to_message']) === null || _117 === void 0 ? void 0 : _117['forward_from']) === null || _118 === void 0 ? void 0 : _118['language_code']
                                                                },
                                                                forward_from_message_id: (_119 = last_update['reply_to_message']) === null || _119 === void 0 ? void 0 : _119['forward_from_message_id'],
                                                                edit_date: (_120 = last_update['reply_to_message']) === null || _120 === void 0 ? void 0 : _120['edit_date'],
                                                                document: {
                                                                    file_id: (_122 = (_121 = last_update['reply_to_message']) === null || _121 === void 0 ? void 0 : _121['document']) === null || _122 === void 0 ? void 0 : _122['file_id'],
                                                                    file_unique_id: (_124 = (_123 = last_update['reply_to_message']) === null || _123 === void 0 ? void 0 : _123['document']) === null || _124 === void 0 ? void 0 : _124['file_unique_id'],
                                                                    file_name: (_126 = (_125 = last_update['reply_to_message']) === null || _125 === void 0 ? void 0 : _125['document']) === null || _126 === void 0 ? void 0 : _126['file_name'],
                                                                    mime_type: (_128 = (_127 = last_update['reply_to_message']) === null || _127 === void 0 ? void 0 : _127['document']) === null || _128 === void 0 ? void 0 : _128['mime_type'],
                                                                    file_size: (_130 = (_129 = last_update['reply_to_message']) === null || _129 === void 0 ? void 0 : _129['document']) === null || _130 === void 0 ? void 0 : _130['file_size']
                                                                },
                                                                photo: rephs_1,
                                                                new_chat_members: renws_1,
                                                                video: {
                                                                    file_id: (_132 = (_131 = last_update['reply_to_message']) === null || _131 === void 0 ? void 0 : _131['video']) === null || _132 === void 0 ? void 0 : _132['file_id'],
                                                                    file_unique_id: (_134 = (_133 = last_update['reply_to_message']) === null || _133 === void 0 ? void 0 : _133['video']) === null || _134 === void 0 ? void 0 : _134['file_unique_id'],
                                                                    width: (_136 = (_135 = last_update['reply_to_message']) === null || _135 === void 0 ? void 0 : _135['video']) === null || _136 === void 0 ? void 0 : _136['width'],
                                                                    height: (_138 = (_137 = last_update['reply_to_message']) === null || _137 === void 0 ? void 0 : _137['video']) === null || _138 === void 0 ? void 0 : _138['height'],
                                                                    duration: (_140 = (_139 = last_update['reply_to_message']) === null || _139 === void 0 ? void 0 : _139['video']) === null || _140 === void 0 ? void 0 : _140['duration'],
                                                                    mime_type: (_142 = (_141 = last_update['reply_to_message']) === null || _141 === void 0 ? void 0 : _141['video']) === null || _142 === void 0 ? void 0 : _142['mime_type'],
                                                                    file_size: (_144 = (_143 = last_update['reply_to_message']) === null || _143 === void 0 ? void 0 : _143['video']) === null || _144 === void 0 ? void 0 : _144['file_size']
                                                                },
                                                                audio: {
                                                                    file_id: (_146 = (_145 = last_update['reply_to_message']) === null || _145 === void 0 ? void 0 : _145['audio']) === null || _146 === void 0 ? void 0 : _146['file_id'],
                                                                    file_unique_id: (_148 = (_147 = last_update['reply_to_message']) === null || _147 === void 0 ? void 0 : _147['audio']) === null || _148 === void 0 ? void 0 : _148['file_unique_id'],
                                                                    duration: (_150 = (_149 = last_update['reply_to_message']) === null || _149 === void 0 ? void 0 : _149['audio']) === null || _150 === void 0 ? void 0 : _150['duration'],
                                                                    mime_type: (_152 = (_151 = last_update['reply_to_message']) === null || _151 === void 0 ? void 0 : _151['audio']) === null || _152 === void 0 ? void 0 : _152['mime_type'],
                                                                    file_size: (_154 = (_153 = last_update['reply_to_message']) === null || _153 === void 0 ? void 0 : _153['audio']) === null || _154 === void 0 ? void 0 : _154['file_size']
                                                                },
                                                                voice: {
                                                                    file_id: (_156 = (_155 = last_update['reply_to_message']) === null || _155 === void 0 ? void 0 : _155['voice']) === null || _156 === void 0 ? void 0 : _156['file_id'],
                                                                    file_unique_id: (_158 = (_157 = last_update['reply_to_message']) === null || _157 === void 0 ? void 0 : _157['voice']) === null || _158 === void 0 ? void 0 : _158['file_unique_id'],
                                                                    duration: (_160 = (_159 = last_update['reply_to_message']) === null || _159 === void 0 ? void 0 : _159['voice']) === null || _160 === void 0 ? void 0 : _160['duration'],
                                                                    mime_type: (_162 = (_161 = last_update['reply_to_message']) === null || _161 === void 0 ? void 0 : _161['voice']) === null || _162 === void 0 ? void 0 : _162['mime_type'],
                                                                    file_size: (_164 = (_163 = last_update['reply_to_message']) === null || _163 === void 0 ? void 0 : _163['voice']) === null || _164 === void 0 ? void 0 : _164['file_size']
                                                                },
                                                                caption: (_165 = last_update['reply_to_message']) === null || _165 === void 0 ? void 0 : _165['caption'],
                                                                contact: {
                                                                    phone_number: (_167 = (_166 = last_update['reply_to_message']) === null || _166 === void 0 ? void 0 : _166['contact']) === null || _167 === void 0 ? void 0 : _167['phone_number'],
                                                                    first_name: (_169 = (_168 = last_update['reply_to_message']) === null || _168 === void 0 ? void 0 : _168['contact']) === null || _169 === void 0 ? void 0 : _169['first_name'],
                                                                    user_id: (_171 = (_170 = last_update['reply_to_message']) === null || _170 === void 0 ? void 0 : _170['contact']) === null || _171 === void 0 ? void 0 : _171['user_id']
                                                                },
                                                                location: {
                                                                    latitude: (_173 = (_172 = last_update['reply_to_message']) === null || _172 === void 0 ? void 0 : _172['location']) === null || _173 === void 0 ? void 0 : _173['latitude'],
                                                                    longitude: (_175 = (_174 = last_update['reply_to_message']) === null || _174 === void 0 ? void 0 : _174['location']) === null || _175 === void 0 ? void 0 : _175['longitude']
                                                                },
                                                                sticker: {
                                                                    file_id: (_177 = (_176 = last_update['reply_to_message']) === null || _176 === void 0 ? void 0 : _176['sticker']) === null || _177 === void 0 ? void 0 : _177['file_id'],
                                                                    file_unique_id: (_179 = (_178 = last_update['reply_to_message']) === null || _178 === void 0 ? void 0 : _178['sticker']) === null || _179 === void 0 ? void 0 : _179['file_unique_id'],
                                                                    type: (_181 = (_180 = last_update['reply_to_message']) === null || _180 === void 0 ? void 0 : _180['sticker']) === null || _181 === void 0 ? void 0 : _181['type'],
                                                                    width: (_183 = (_182 = last_update['reply_to_message']) === null || _182 === void 0 ? void 0 : _182['sticker']) === null || _183 === void 0 ? void 0 : _183['width'],
                                                                    height: (_185 = (_184 = last_update['reply_to_message']) === null || _184 === void 0 ? void 0 : _184['sticker']) === null || _185 === void 0 ? void 0 : _185['height'],
                                                                    is_animated: (_187 = (_186 = last_update['reply_to_message']) === null || _186 === void 0 ? void 0 : _186['sticker']) === null || _187 === void 0 ? void 0 : _187['is_animated'],
                                                                    is_video: (_189 = (_188 = last_update['reply_to_message']) === null || _188 === void 0 ? void 0 : _188['sticker']) === null || _189 === void 0 ? void 0 : _189['is_video'],
                                                                    thumbnail: {
                                                                        file_id: (_192 = (_191 = (_190 = last_update['reply_to_message']) === null || _190 === void 0 ? void 0 : _190['sticker']) === null || _191 === void 0 ? void 0 : _191['thumb']) === null || _192 === void 0 ? void 0 : _192['file_id'],
                                                                        file_unique_id: (_195 = (_194 = (_193 = last_update['reply_to_message']) === null || _193 === void 0 ? void 0 : _193['sticker']) === null || _194 === void 0 ? void 0 : _194['thumb']) === null || _195 === void 0 ? void 0 : _195['file_unique_id'],
                                                                        file_size: (_198 = (_197 = (_196 = last_update['reply_to_message']) === null || _196 === void 0 ? void 0 : _196['sticker']) === null || _197 === void 0 ? void 0 : _197['thumb']) === null || _198 === void 0 ? void 0 : _198['file_id'],
                                                                        width: (_201 = (_200 = (_199 = last_update['reply_to_message']) === null || _199 === void 0 ? void 0 : _199['sticker']) === null || _200 === void 0 ? void 0 : _200['thumb']) === null || _201 === void 0 ? void 0 : _201['width'],
                                                                        height: (_204 = (_203 = (_202 = last_update['reply_to_message']) === null || _202 === void 0 ? void 0 : _202['sticker']) === null || _203 === void 0 ? void 0 : _203['thumb']) === null || _204 === void 0 ? void 0 : _204['height']
                                                                    },
                                                                    set_name: (_206 = (_205 = last_update['reply_to_message']) === null || _205 === void 0 ? void 0 : _205['sticker']) === null || _206 === void 0 ? void 0 : _206['set_name'],
                                                                    file_size: (_208 = (_207 = last_update['reply_to_message']) === null || _207 === void 0 ? void 0 : _207['sticker']) === null || _208 === void 0 ? void 0 : _208['file_size']
                                                                },
                                                                left_chat_member: {
                                                                    id: (_210 = (_209 = last_update['reply_to_message']) === null || _209 === void 0 ? void 0 : _209['left_chat_member']) === null || _210 === void 0 ? void 0 : _210['id'],
                                                                    is_bot: (_212 = (_211 = last_update['reply_to_message']) === null || _211 === void 0 ? void 0 : _211['left_chat_member']) === null || _212 === void 0 ? void 0 : _212['is_bot'],
                                                                    first_name: (_214 = (_213 = last_update['reply_to_message']) === null || _213 === void 0 ? void 0 : _213['left_chat_member']) === null || _214 === void 0 ? void 0 : _214['first_name'],
                                                                    last_name: (_216 = (_215 = last_update['reply_to_message']) === null || _215 === void 0 ? void 0 : _215['left_chat_member']) === null || _216 === void 0 ? void 0 : _216['last_name'],
                                                                    username: (_218 = (_217 = last_update['reply_to_message']) === null || _217 === void 0 ? void 0 : _217['left_chat_member']) === null || _218 === void 0 ? void 0 : _218['username'],
                                                                    language_code: (_220 = (_219 = last_update['reply_to_message']) === null || _219 === void 0 ? void 0 : _219['left_chat_member']) === null || _220 === void 0 ? void 0 : _220['language_code'],
                                                                },
                                                                successful_payment: (_221 = last_update['reply_to_message']) === null || _221 === void 0 ? void 0 : _221['successful_payment'],
                                                                invoice: {
                                                                    chat_id: (_223 = (_222 = last_update['reply_to_message']) === null || _222 === void 0 ? void 0 : _222['invoice']) === null || _223 === void 0 ? void 0 : _223['chat_id'],
                                                                    title: (_225 = (_224 = last_update['reply_to_message']) === null || _224 === void 0 ? void 0 : _224['invoice']) === null || _225 === void 0 ? void 0 : _225['title'],
                                                                    description: (_227 = (_226 = last_update['reply_to_message']) === null || _226 === void 0 ? void 0 : _226['invoice']) === null || _227 === void 0 ? void 0 : _227['description'],
                                                                    payload: (_229 = (_228 = last_update['reply_to_message']) === null || _228 === void 0 ? void 0 : _228['invoice']) === null || _229 === void 0 ? void 0 : _229['payload'],
                                                                    provider_token: (_231 = (_230 = last_update['reply_to_message']) === null || _230 === void 0 ? void 0 : _230['invoice']) === null || _231 === void 0 ? void 0 : _231['provider_token'],
                                                                    photo_url: (_233 = (_232 = last_update['reply_to_message']) === null || _232 === void 0 ? void 0 : _232['invoice']) === null || _233 === void 0 ? void 0 : _233['photo_url'],
                                                                    reply_to_message_id: (_235 = (_234 = last_update['reply_to_message']) === null || _234 === void 0 ? void 0 : _234['invoice']) === null || _235 === void 0 ? void 0 : _235['reply_to_message_id'],
                                                                    reply_markup: (_237 = (_236 = last_update['reply_to_message']) === null || _236 === void 0 ? void 0 : _236['invoice']) === null || _237 === void 0 ? void 0 : _237['reply_markup'],
                                                                    prices: (_239 = (_238 = last_update['reply_to_message']) === null || _238 === void 0 ? void 0 : _238['invoice']) === null || _239 === void 0 ? void 0 : _239['prices']
                                                                }
                                                            }
                                                        };
                                                        if (evs.includes("message")) {
                                                            mesids.push(last_update['date']);
                                                            this.emit("message", m);
                                                        }
                                                        if (evs.includes("photo")) {
                                                            if (m.photo.length > 0) {
                                                                mesids.push(last_update['date']);
                                                                this.emit("photo", m);
                                                            }
                                                        }
                                                        if (evs.includes("video")) {
                                                            if (m.video.file_id !== undefined) {
                                                                mesids.push(last_update['date']);
                                                                this.emit("video", m);
                                                            }
                                                        }
                                                        if (evs.includes("sticker")) {
                                                            if (m.sticker.file_id !== undefined) {
                                                                mesids.push(last_update['date']);
                                                                this.emit("sticker", m);
                                                            }
                                                        }
                                                        if (evs.includes("audio")) {
                                                            if (m.audio.file_id !== undefined) {
                                                                mesids.push(last_update['date']);
                                                                this.emit("audio", m);
                                                            }
                                                        }
                                                        if (evs.includes("voice")) {
                                                            if (m.voice.file_id !== undefined) {
                                                                mesids.push(last_update['date']);
                                                                this.emit("voice", m);
                                                            }
                                                        }
                                                        if (evs.includes("document")) {
                                                            if (m.document.file_id !== undefined) {
                                                                mesids.push(last_update['date']);
                                                                this.emit("document", m);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                if (!evs.includes("callback_query")) return [3 /*break*/, 5];
                                return [4 /*yield*/, this.request.makeConnection("getUpdates", {}, function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        var indexes, last_index, last_update, cq;
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
                                        return __generator(this, function (_22) {
                                            if (res.ok) {
                                                indexes = (_a = res['result']) !== null && _a !== void 0 ? _a : [{}];
                                                last_index = indexes.length - 1;
                                                //.log(indexes);
                                                if (Object.keys(indexes[last_index]).includes("callback_query") === true) {
                                                    last_update = indexes[last_index]['callback_query'];
                                                    if (!(clids.includes(last_update['id']))) {
                                                        ;
                                                        ;
                                                        cq = {
                                                            id: last_update['id'],
                                                            from: {
                                                                id: (_b = last_update['from']) === null || _b === void 0 ? void 0 : _b['id'],
                                                                is_bot: (_c = last_update['from']) === null || _c === void 0 ? void 0 : _c['is_bot'],
                                                                first_name: (_d = last_update['from']) === null || _d === void 0 ? void 0 : _d['first_name'],
                                                                last_name: (_e = last_update['from']) === null || _e === void 0 ? void 0 : _e['last_name'],
                                                                username: (_f = last_update['from']) === null || _f === void 0 ? void 0 : _f['username'],
                                                                language_code: (_g = last_update['from']) === null || _g === void 0 ? void 0 : _g['language_code']
                                                            },
                                                            message: {
                                                                id: (_h = last_update['message']) === null || _h === void 0 ? void 0 : _h['message_id'],
                                                                text: (_j = last_update['message']) === null || _j === void 0 ? void 0 : _j['text'],
                                                                from: {
                                                                    id: (_l = (_k = last_update['message']) === null || _k === void 0 ? void 0 : _k['from']) === null || _l === void 0 ? void 0 : _l['id'],
                                                                    is_bot: (_o = (_m = last_update['message']) === null || _m === void 0 ? void 0 : _m['from']) === null || _o === void 0 ? void 0 : _o['is_bot'],
                                                                    first_name: (_q = (_p = last_update['message']) === null || _p === void 0 ? void 0 : _p['from']) === null || _q === void 0 ? void 0 : _q['first_name'],
                                                                    last_name: (_s = (_r = last_update['message']) === null || _r === void 0 ? void 0 : _r['from']) === null || _s === void 0 ? void 0 : _s['last_name'],
                                                                    username: (_u = (_t = last_update['message']) === null || _t === void 0 ? void 0 : _t['from']) === null || _u === void 0 ? void 0 : _u['username'],
                                                                    language_code: (_w = (_v = last_update['message']) === null || _v === void 0 ? void 0 : _v['from']) === null || _w === void 0 ? void 0 : _w['language_code']
                                                                },
                                                                date: (_x = last_update['message']) === null || _x === void 0 ? void 0 : _x['date'],
                                                                chat: {
                                                                    id: (_z = (_y = last_update['message']) === null || _y === void 0 ? void 0 : _y['chat']) === null || _z === void 0 ? void 0 : _z['id'],
                                                                    first_name: (_1 = (_0 = last_update['message']) === null || _0 === void 0 ? void 0 : _0['chat']) === null || _1 === void 0 ? void 0 : _1['first_name'],
                                                                    photo: {
                                                                        big_file_id: (_4 = (_3 = (_2 = last_update['message']) === null || _2 === void 0 ? void 0 : _2['chat']) === null || _3 === void 0 ? void 0 : _3['photo']) === null || _4 === void 0 ? void 0 : _4['big_file_id'],
                                                                        big_file_unique_id: (_7 = (_6 = (_5 = last_update['message']) === null || _5 === void 0 ? void 0 : _5['chat']) === null || _6 === void 0 ? void 0 : _6['photo']) === null || _7 === void 0 ? void 0 : _7['big_file_unique_id'],
                                                                        small_file_id: (_10 = (_9 = (_8 = last_update['message']) === null || _8 === void 0 ? void 0 : _8['chat']) === null || _9 === void 0 ? void 0 : _9['photo']) === null || _10 === void 0 ? void 0 : _10['small_file_id'],
                                                                        small_file_unique_id: (_13 = (_12 = (_11 = last_update['message']) === null || _11 === void 0 ? void 0 : _11['chat']) === null || _12 === void 0 ? void 0 : _12['photo']) === null || _13 === void 0 ? void 0 : _13['small_file_unique_id']
                                                                    },
                                                                    type: (_15 = (_14 = last_update['message']) === null || _14 === void 0 ? void 0 : _14['chat']) === null || _15 === void 0 ? void 0 : _15['type'],
                                                                    title: (_17 = (_16 = last_update['message']) === null || _16 === void 0 ? void 0 : _16['chat']) === null || _17 === void 0 ? void 0 : _17['title'],
                                                                    username: (_19 = (_18 = last_update['message']) === null || _18 === void 0 ? void 0 : _18['chat']) === null || _19 === void 0 ? void 0 : _19['username'],
                                                                    invite_link: (_21 = (_20 = last_update['message']) === null || _20 === void 0 ? void 0 : _20['chat']) === null || _21 === void 0 ? void 0 : _21['invite_link']
                                                                }
                                                            },
                                                            inline_message_id: last_update['inline_message_id'],
                                                            chat_instance: last_update['chat_instance'],
                                                            data: last_update['data']
                                                        };
                                                        clids.push(last_update['id']);
                                                        this.emit("callback_query", cq);
                                                    }
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); })];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }, intervalTime !== null && intervalTime !== void 0 ? intervalTime : this.time);
                this.intervalId = interval;
                return [2 /*return*/];
            });
        });
    };
    return BaleBot;
}(events_1.EventEmitter));
exports.BaleBot = BaleBot;
module.exports = { BaleBot: BaleBot, MaskText: interfaces_1.MaskText };
