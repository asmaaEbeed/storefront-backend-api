"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserModel = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var _a = process.env, PEPPER = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, TOKEN_SECRET = _a.TOKEN_SECRET;
if (!PEPPER || !SALT_ROUNDS || !TOKEN_SECRET)
    throw new Error();
var makeUserModel = /** @class */ (function () {
    function makeUserModel() {
    }
    makeUserModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Unable get users: ".concat(err_1));
                    case 5:
                        conn.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    makeUserModel.prototype.showUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        console.log(id);
                        return [4 /*yield*/, connection.query('SELECT * FROM users WHERE id = $1', [id])];
                    case 3:
                        result = _a.sent();
                        if (result.rowCount === 0)
                            throw new Error("user ".concat(id, " is not found"));
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_2));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    makeUserModel.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result, user, token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "INSERT INTO users (firstName, lastName, password, email) VALUES($1, $2, $3, $4) RETURNING *";
                        hash = bcrypt_1.default.hashSync(u.password + PEPPER, Number(SALT_ROUNDS));
                        return [4 /*yield*/, conn.query(sql, [u.firstName, u.lastName, hash, u.email])];
                    case 3:
                        result = _a.sent();
                        console.log("inserted successfully");
                        user = result.rows[0];
                        token = jsonwebtoken_1.default.sign(user, TOKEN_SECRET);
                        return [2 /*return*/, token];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("unable create user (".concat(u.email, "): ").concat(err_3));
                    case 5:
                        conn.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    makeUserModel.prototype.authenticate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, _a, hashed, user, isValid, token, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, 6, 7]);
                        sql = 'SELECT * FROM users WHERE email=($1)';
                        return [4 /*yield*/, conn.query(sql, [params.email])];
                    case 3:
                        result = _b.sent();
                        console.log(params.password + PEPPER);
                        if (result.rowCount === 0)
                            throw new Error("Wrong user name or password");
                        _a = result.rows[0], hashed = _a.password, user = __rest(_a, ["password"]);
                        return [4 /*yield*/, bcrypt_1.default.compare(params.password + PEPPER, hashed)];
                    case 4:
                        isValid = _b.sent();
                        if (!isValid)
                            throw new Error('Wrong userNameor password');
                        token = jsonwebtoken_1.default.sign(user, TOKEN_SECRET);
                        return [2 /*return*/, token];
                    case 5:
                        err_4 = _b.sent();
                        throw new Error("Could not login ".concat(params.email, ". Error: ").concat(err_4));
                    case 6:
                        conn.release();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    makeUserModel.prototype.verify = function (token) {
        return jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    };
    makeUserModel.prototype.update = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 5]);
                        return [4 /*yield*/, connection.query('UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id=$4 RETURNING *', [user.firstName, user.lastName, user.email])];
                    case 3:
                        result = _a.sent();
                        if (result.rowCount === 0)
                            throw "User ".concat(id, " not found.");
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    makeUserModel.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        try {
                            result = connection.query('DELETE FROM users WHERE id = $1', [id]);
                            return [2 /*return*/];
                        }
                        finally {
                            connection.release();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return makeUserModel;
}());
exports.makeUserModel = makeUserModel;
