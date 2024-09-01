import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get : fetches all categories

router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

//post : adds a new category on the db
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Category name is required" });
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add the new category" });
  }
});

//delete

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

export default router;
