import * as path from "path"
import * as dotenv from "dotenv"

// Load environment variables from the monorepo root .env
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") })
import { PrismaClient } from "../prisma/generated/client"

export const prisma = new PrismaClient()
export * from "../prisma/generated/client"