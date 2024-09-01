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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get : fetches all categories
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.json(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
}));
//post : adds a new category on the db
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: "Category name is required" });
    }
    try {
        const newCategory = yield prisma.category.create({
            data: {
                name: name,
            },
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add the new category" });
    }
}));
//delete
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.category.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(204).json({ msg: "Deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete category" });
    }
}));
exports.default = router;
