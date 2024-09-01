"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const categories_1 = __importDefault(require("./routes/categories"));
const bookmarks_1 = __importDefault(require("./routes/bookmarks"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/categories", categories_1.default);
app.use("/bookmarks", bookmarks_1.default);
const port = 8081;
app.listen(port, () => {
    console.log("Server spinning on port ", port);
});
