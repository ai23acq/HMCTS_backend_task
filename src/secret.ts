import dotenv from "dotenv"

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const DATABASE_URL = process.env.DATABASE_URL;
export const BACKEND_URL = process.env.BACKEND_URL