import pg from "pg";

// It's a good practice to separate the database connection string from the code.
// Consider storing sensitive information like database connection strings in environment variables.
// For example, you can use process.env.DATABASE_URL to access the connection string stored in an environment variable named DATABASE_URL.
// This approach enhances security and makes your application more flexible.

import authModel from "../models/authModel.js";
import messageModel from "../models/messageModel.js";

const pool = new pg.Pool({
  connectionString:'postgresql://chatdb_gb4v_user:zJYYDxhhkqIdAuaCMiqg4oMBtY0g5Z0C@dpg-cq0lk06ehbks73edj9s0-a.singapore-postgres.render.com/chatdb_gb4v',
  ssl: {
    rejectUnauthorized: false,
  },
});

const startdb = async () => {
    try {
        await pool.connect(); // It's good practice to handle the promise returned by connect.
        await pool.query("DROP TABLE IF EXISTS messages")
        const time = await pool.query("SELECT NOW()");
        console.log(time.rows);
        console.log("Database connected");
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
        // Assuming authModel and messageModel contain SQL statements for initializing the database,
        // it's a good practice to check if these variables are not empty or undefined before attempting to execute them.
        if (authModel) {
            await pool.query(authModel);
        }
        if (messageModel) {
            await pool.query(messageModel);
        }
    } catch (error) {
        console.error(error); // It's a good practice to use console.error for logging errors.
    }
};

export { startdb };
export default pool;