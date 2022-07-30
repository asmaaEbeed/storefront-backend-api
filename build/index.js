"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv = __importStar(require("dotenv"));
var orders_1 = __importDefault(require("./handlers/orders"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var auth_1 = __importDefault(require("./handlers/auth"));
var auth_2 = require("./services/auth");
var authenticateModel = new auth_2.authenticate();
dotenv.config();
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
app.use((0, express_1.urlencoded)());
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
// app.use(order_routes);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
(0, orders_1.default)(app);
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, auth_1.default)(app);
app.use(express_1.default.json());
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World!'
    });
});
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports.default = app;
