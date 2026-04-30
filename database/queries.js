import pool from "./pool.js";

async function dbGetMessages() {
  const { rows } = await pool.query(
    `SELECT * FROM messages JOIN users ON messages.sender_id = users.id`,
  );
  return rows;
}

async function dbGetUserByID(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
}

async function dbGetUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
}

async function dbAddUser(fullName, email, password) {
  await pool.query(
    `INSERT INTO users(fullname,email,password) VALUES($1,$2,$3)`,
    [fullName, email, password],
  );
}

async function dbAddMessage(sender_id, text) {
  await pool.query(`INSERT INTO messages (sender_id,text) VALUES ($1,$2)`, [
    sender_id,
    text,
  ]);
}

async function dbUpdateMembership(id) {
  await pool.query(`UPDATE users SET private_membership = true WHERE id = $1`, [
    id,
  ]);
}

export {
  dbGetMessages,
  dbGetUserByID,
  dbGetUserByEmail,
  dbAddUser,
  dbAddMessage,
  dbUpdateMembership,
};
