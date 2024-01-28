import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../connection";

const router = express.Router();

router.get("/user-info", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).send({ error: "NO TOKEN" });
  }

  const result = jwt.decode(token);
  console.log(result);

  if (!result) {
    return res.status(400).send({ error: "CAN'T DECODE TOKEN" });
  }

  const user_data = await pool.query(
    "SELECT first_name, last_name FROM users WHERE user_id = $1",
    [Number(result)]
  );

  if (user_data.rows.length === 0) {
    return res.status(400).send({ error: "USER NOT FOUND" });
  }

  console.log(user_data.rows);
  return res.status(200).send(user_data.rows[0]);
});

export default router;
