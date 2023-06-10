import { sql } from "../server.js";

export const getUser = function async(req, res) {
  res.json({ status: "Success", message: "You have reached the login route" });
};
