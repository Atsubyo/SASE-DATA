"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prismaClient_1 = __importDefault(require("./prismaClient")); // Ensure path is correct
const router = express_1.default.Router();
// Apply CORS middleware
router.use((0, cors_1.default)());
router.use(express_1.default.json());
const EVENT_COLUMNS = [
    "INFORMATIONAL",
    "WILLIAMSGBM",
    "BOBASOCIAL",
    "CDMSMITH",
    "SQUADREVEALSOCIAL",
    "RESUMEROAST",
    "GEVERNOVA",
    "KIMCHISCAVENGERHUNT",
    "KDASOCIAL",
    "SWRIGBM",
    "SQUIDSQUADGAMES",
];
// GET /api/attendance
router.get('/attendance', async (req, res) => {
    const uin = req.query.uin;
    console.log("Received request with UIN:", uin);
    if (!uin || typeof uin !== 'string') {
        console.log("Invalid UIN provided.");
        return res.status(400).json({ message: "'uin' is required and must be a string." });
    }
    try {
        console.log("Fetching user from the database...");
        const user = await prismaClient_1.default.users.findUnique({ where: { UIN: uin } });
        console.log("User fetched:", user);
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Collecting attendance history...");
        const AHC = EVENT_COLUMNS.map(event => ({
            event_name: event,
            attended: !!user[event],
        }));
        const response = {
            full_name: user.name,
            AHC,
        };
        console.log("Responding with user data:", response);
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Error in GET /api/attendance:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            details: error instanceof Error ? error.message : "An unknown error occurred.",
        });
    }
});
exports.default = router;
