import { sql } from "../server.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await sql`SELECT * FROM users WHERE username = ${username};`;

    console.log(user);
    const isValid = await bcrypt.compare(password, user[0].password);

    if (!isValid) {
      res.status(400).json({ err: "Invalid password" });
      return;
    }

    const token = jwt.sign(user[0].id, process.env.JWT_SECRET);

    res.json({
      status: "Success",
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
