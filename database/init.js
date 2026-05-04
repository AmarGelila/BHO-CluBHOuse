import "dotenv/config";
import { Client } from "pg";

const SQL = `

    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar PRIMARY KEY COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");


    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        private_membership BOOLEAN DEFAULT FALSE
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);


    CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sender_id INT,
        text TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT messages_fk
          FOREIGN KEY(sender_id)
          REFERENCES users(id)
          ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
