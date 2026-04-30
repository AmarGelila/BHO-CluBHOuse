import "dotenv/config";
import { Client } from "pg";

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        private_membership BOOLEAN DEFAULT FALSE
    );
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

    INSERT INTO users (fullname, password, email, private_membership)
    VALUES 
    ('Jordan Smith', 'pbkdf2_sha256$250000$hashed_val_1', 'jordan.smith@example.com',FALSE),
    ('Alex Rivera', 'pbkdf2_sha256$250000$hashed_val_2', 'arivera@techworld.org', TRUE),
    ('Casey Chen', 'pbkdf2_sha256$250000$hashed_val_3', 'casey.c@startup.io',FALSE),
    ('Taylor Morgan', 'pbkdf2_sha256$250000$hashed_val_4', 'taylor.m@service.net',  TRUE),
    ('Sam Wilson', 'pbkdf2_sha256$250000$hashed_val_5', 'sam.wilson@webmail.com',FALSE);

    INSERT INTO messages (sender_id, text, created_at)
    VALUES 
    (1, 'Hey everyone! Has anyone started the new project documentation?', NOW() - INTERVAL '2 hours'),
    (2, 'I started a draft this morning. Just need to finish the architecture section.', NOW() - INTERVAL '90 minutes'),
    (3, 'Sounds good, Alex. Let me know if you need help with the API specs.', NOW() - INTERVAL '1 hour'),
    (1, 'Thanks! I will check the draft later this evening.', NOW() - INTERVAL '45 minutes'),
    (4, 'Does anyone know when the deadline for the first sprint is?', NOW() - INTERVAL '30 minutes'),
    (2, 'I believe it is next Friday at 5 PM.', NOW() - INTERVAL '10 minutes');
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
