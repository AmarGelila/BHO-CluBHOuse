import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.POSTGRESQL_ADDON_URI || process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
