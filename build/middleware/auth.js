"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var auth_1 = require("../services/auth");
var authenticateModel = new auth_1.authenticate();
function authMiddleware(req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            throw new Error("Invalid token");
        var user = authenticateModel.verify(token);
        console.log("user");
        console.log(user);
        res.locals.user = user;
        next();
    }
    catch (e) {
        res.status(401).send("Unauthorized");
    }
}
exports.authMiddleware = authMiddleware;
