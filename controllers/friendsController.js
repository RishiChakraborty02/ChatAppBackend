const findFriend = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await pool.query("SELECT * FROM auth WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res
      .status(200)
      .json({ username: user.rows[0].username, user_id: user.rows[0].user_id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export { findFriend };
