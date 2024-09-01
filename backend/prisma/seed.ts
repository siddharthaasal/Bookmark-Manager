import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CategoryData {
  name: string;
}

async function main() {
  const defaultCategories: CategoryData[] = [
    { name: "Work" },
    { name: "Entertainment" },
  ];

  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: { name: category.name },
    });
  }

  console.log("Default categories added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
