import pg from "pg";

import authModel from "../models/authModel.js";
import messageModel from "../models/messageModel.js";

const pool = new pg.Pool({
connectionString: "postgresql://chatdb_gb4v_user:zJYYDxhhkqIdAuaCMiqg4oMBtY0g5Z0C@dpg-cq0lk06ehbks73edj9s0-a.singapore-postgres.render.com/chatdb_gb4v",
ssl: {
rejectUnauthorized: false,
}
});

const startdb = async () => {
    try {
        pool.connect()
        console.log("Database connected")
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await pool.query(authModel)
        await pool.query(messageModel)
    } catch (error) {
        console.log(error)
    }
}
export { startdb}
export default pool;