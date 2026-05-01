import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false,
  },
});

export default pool;
