cd frontend
npm i 
npm run dev


cd backend

npm init -y

npm install prisma typescript ts-node @types/node --save-dev

npx tsc --init
Change `rootDit` to `src`
Change `outDir` to `dist`

npx prisma init


to add default shit int o schema 
prisma/seed.ts 
therefore, change the tsconfig rootDir to "./"

npx prisma generate
npx prisma migrate dev --name init

add seed in scrips in package.json
npm run seed