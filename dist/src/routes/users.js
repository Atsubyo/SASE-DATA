"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.get('/', usersController_1.getUser);
router.get('/add', usersController_1.addUser);
router.get('/delete', usersController_1.deleteUser);
exports.default = router;
