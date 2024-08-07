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
      console.log(data);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message", data);
      } else {
        try {
          await pool.query(
            "INSERT INTO messages (message_id, sent_by, received_by,message_status,message_content,sent_at) VALUES ($1, $2, $3, $4, $5, $6)",
            [
              data.message_id,
              data.sent_by,
              data.received_by,
              1,
              data.message_content,
              data.sent_at,
            ]
          );
        } catch (error) {
          console.error("Error saving message to database:", error);
        }
      }
    });

    socket.on("receiveundelivered", async (data) => {
      try {
        const undeliveredmsgs = await pool.query(
          "SELECT  * from messages where received_by = $1 and message_status = $2",
          [socket.user, 1]
        );
        socket.emit("undelivered", undeliveredmsgs.rows);
      } catch (error) {}
    });
  });
}

export { chatServer };
