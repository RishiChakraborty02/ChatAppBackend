import pool from "../config/dbConfig.js";
const findFriend = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await pool.query("SELECT * FROM auth WHERE username LIKE $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res
      .status(200)
      .json(user.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export { findFriend };
