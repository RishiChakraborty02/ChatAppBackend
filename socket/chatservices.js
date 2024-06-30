import { io } from "../app.js";
import pool from "../config/dbConfig.js";

const activeUsers = {};

async function chatServer() {
  console.log("Chat server ignited");
  io.on("connection", (socket) => {
    activeUsers[socket.user] = socket.id;
    console.log(activeUsers);

    socket.on("disconnect", () => {
      delete activeUsers[socket.user];
    });

    socket.on("message", async (data) => {
      const recipientSocketId = activeUsers[data.received_by];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message", data);
      } else {
        try {
          await pool.query(
            "INSERT INTO messages (message_id, sent_by, received_by,message_status,message_content) VALUES ($1, $2, $3)",
            [
              data.message_id,
              data.sent_by,
              data.received_by,
              1,
              data.message_content,
            ]
          );
        } catch (error) {
          console.error("Error saving message to database:", error);
        }
      }
    });
  });
}

export { chatServer };
