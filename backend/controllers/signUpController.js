import { sql } from "../server.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    const exists = await sql`SELECT * FROM users WHERE username = ${username};`;
    console.log(exists);

    if (exists.length > 0) {
      res.status(400).json({ err: "Username already exists" });
      return;
    }

    const result = await sql`
      INSERT INTO users
        (username, email, password)
      VALUES
        (${username}, ${email}, ${password})
      RETURNING id, username, email
    `;

    await sql`INSERT INTO decks`;
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
