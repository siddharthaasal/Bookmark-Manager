import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

import categoryRouter from "./routes/categories";
import bookmarkRouter from "./routes/bookmarks";

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/categories", categoryRouter);
app.use("/bookmarks", bookmarkRouter);

const port = 8081;

app.listen(port, () => {
  console.log("Server spinning on port ", port);
});
