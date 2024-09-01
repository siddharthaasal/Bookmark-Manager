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
//get
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bookmarks = yield prisma.bookmark.findMany({
            where: {
                categoryId: parseInt(id),
            },
        });
        res.json(bookmarks);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
}));
//post
router.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, link } = req.body;
    try {
        const newBookmark = yield prisma.bookmark.create({
            data: {
                name,
                description,
                link,
                category: {
                    connect: {
                        id: parseInt(id),
                    },
                },
            },
        });
        res.status(201).json(newBookmark);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add bookmark" });
    }
}));
// delete 
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.bookmark.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(204).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete bookmark" });
    }
}));
exports.default = router;
