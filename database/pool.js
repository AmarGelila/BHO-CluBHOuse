import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_ADDON_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
