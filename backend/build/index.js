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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = require("./connect");
require("dotenv/config");
const image_1 = __importDefault(require("./routes/image"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT) || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
// Example route for handling image creation and retrieval
app.use(image_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Hello" });
}));
// Call the connectDB function to establish the connection
(0, connect_1.connectDB)()
    .then(() => {
    // Code that depends on the database connection
    app.listen(PORT, () => {
        console.log(`server url is http://localhost:${PORT} `);
    });
})
    .catch((error) => {
    console.error("Failed to connect to the database:", error);
});
