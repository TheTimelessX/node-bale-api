"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
var axios = require("axios");
var fs_1 = require("fs");
var path_1 = require("path");
var FormData = require("form-data");
var Connection = /** @class */ (function () {
    function Connection(token) {
        this.token = token;
        this.url = "https://tapi.bale.ai/bot".concat(this.token);
        this.file_url = "https://tapi.bale.ai/file/bot".concat(this.token, "/");
    }
    Connection.prototype.makeConnection = function (method, inputes, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = this.url + "/".concat(method);
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                body: JSON.stringify(inputes),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 1:
                        _ = _a.sent();
                        return [4 /*yield*/, _.json()];
                    case 2:
                        res = _a.sent();
                        callback(res);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        callback({ ok: false, message: e_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.makeConnectionMultiPart = function (method, inputes, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = this.url + "/".concat(method);
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                body: JSON.stringify(inputes),
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            })];
                    case 1:
                        _ = _a.sent();
                        return [4 /*yield*/, _.json()];
                    case 2:
                        res = _a.sent();
                        callback(res);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        callback({ ok: false, message: e_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.toTitleCase = function (str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
            .join(' ');
    };
    Connection.prototype.uploadSomething = function (opts_1) {
        return __awaiter(this, arguments, void 0, function (opts, callback) {
            var fileStream, formData, error_1;
            var _a;
            if (callback === void 0) { callback = function (data) { }; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        fileStream = (0, fs_1.createReadStream)(opts.path);
                        formData = new FormData();
                        formData.append("chat_id", opts.chat_id.toString());
                        formData.append(opts.media, fileStream, (0, path_1.basename)(opts.path));
                        formData.append("caption", (_a = opts.caption) !== null && _a !== void 0 ? _a : "");
                        if (opts.reply_to_message_id !== undefined) {
                            formData.append("reply_to_message_id", opts.reply_to_message_id.toString());
                        }
                        if (opts.reply_markup !== undefined) {
                            formData.append("reply_markup", JSON.stringify({ keyboard: opts.reply_markup }));
                        }
                        return [4 /*yield*/, axios.post("https://tapi.bale.ai/bot".concat(this.token, "/send").concat(this.toTitleCase(opts.media)), formData, {
                                headers: __assign({}, formData.getHeaders()),
                            }).then(function (resp) {
                                callback(resp.data);
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        callback({
                            ok: false,
                            message: error_1
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.setChatPhoto = function (path_2, chatId_1) {
        return __awaiter(this, arguments, void 0, function (path, chatId, callback) {
            var fileStream, formData, error_2;
            if (callback === void 0) { callback = function (data) { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fileStream = (0, fs_1.createReadStream)(path);
                        formData = new FormData();
                        formData.append("chat_id", chatId.toString());
                        formData.append("photo", fileStream, (0, path_1.basename)(path));
                        return [4 /*yield*/, axios.post("https://tapi.bale.ai/bot".concat(this.token, "/setChatPhoto"), formData, {
                                headers: __assign({}, formData.getHeaders()),
                            }).then(function (resp) {
                                callback(resp.data);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        callback({
                            ok: false,
                            message: error_2
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* Beta */
    Connection.prototype.uploadSticker = function (path_2, userId_1) {
        return __awaiter(this, arguments, void 0, function (path, userId, callback) {
            var fileStream, formData, error_3;
            if (callback === void 0) { callback = function (data) { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fileStream = (0, fs_1.createReadStream)(path);
                        formData = new FormData();
                        formData.append("user_id", userId.toString());
                        formData.append("sticker", fileStream, (0, path_1.basename)(path));
                        return [4 /*yield*/, axios.post("https://tapi.bale.ai/bot".concat(this.token, "/uploadStickerFile"), formData, {
                                headers: __assign({}, formData.getHeaders()),
                            }).then(function (resp) {
                                callback(resp.data);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        callback({
                            ok: false,
                            message: error_3
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* Beta */
    Connection.prototype.uploadStickerToSet = function (path_2, userId_1, setName_1) {
        return __awaiter(this, arguments, void 0, function (path, userId, setName, callback) {
            var fileStream, formData, error_4;
            if (callback === void 0) { callback = function (data) { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fileStream = (0, fs_1.createReadStream)(path);
                        formData = new FormData();
                        formData.append("user_id", userId.toString());
                        formData.append("name", setName);
                        formData.append("sticker", fileStream, (0, path_1.basename)(path));
                        return [4 /*yield*/, axios.post("https://tapi.bale.ai/bot".concat(this.token, "/addStickerToSet"), formData, {
                                headers: __assign({}, formData.getHeaders()),
                            }).then(function (resp) {
                                callback(resp.data);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        callback({
                            ok: false,
                            message: error_4
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.fileConnection = function (filePath_1) {
        return __awaiter(this, arguments, void 0, function (filePath, callback) {
            var url, _, res, e_3;
            if (callback === void 0) { callback = function (data) { }; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = this.file_url + filePath;
                        return [4 /*yield*/, fetch(url, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 1:
                        _ = _a.sent();
                        return [4 /*yield*/, _.text()];
                    case 2:
                        res = _a.sent();
                        callback(res);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        callback({ ok: false, message: e_3 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Connection;
}());
exports.Connection = Connection;
module.exports = { Connection: Connection };
