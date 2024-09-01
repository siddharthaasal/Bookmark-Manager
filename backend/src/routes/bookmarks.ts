import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//get

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        categoryId: parseInt(id),
      },
    });
    res.json(bookmarks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

//post

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, link } = req.body;

  try {
    const newBookmark = await prisma.bookmark.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add bookmark" });
  }
});

// delete 

router.delete('/:id', async(req, res)=>{
    const {id} = req.params;

    try{
        await prisma.bookmark.delete({
            where:{
                id: parseInt(id)
            }
        });
        res.status(204).send();
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to delete bookmark"});
    }
})

export default router;
