"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./src/config/config"));
const register_1 = __importDefault(require("./src/routes/register"));
const attendance_1 = __importDefault(require("./src/routes/attendance"));
const users_1 = __importDefault(require("./src/routes/users"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/register', register_1.default);
app.use('/attendance', attendance_1.default);
app.use('/user', users_1.default);
app.listen(PORT, () => {
    console.log(`Server running on ${config_1.default.port}`);
});
