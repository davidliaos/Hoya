import express from "express";
import bcrypt from "bcrypt";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { pool } from "../connection";
import jwt from "jsonwebtoken";
import cors from "cors";

const router = express.Router();
const saltRounds = 10;

router.use(cors());

router.post(
  "/login",
  validateRequest({
    body: z.object({
      email: z.string(),
      password: z.string(),
    }),
  }),
  async (req, res) => {
    const body = req.body;
    console.log(body);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = bcrypt.hash(body.password, salt);

    const result = await pool.query(
      "SELECT user_id FROM users WHERE email = $1 AND password = $2",
      [body.email, hashed_password]
    );

    if (result.rows.length === 0) {
      return res.status(400).send({ error: "NOT FOUND" });
    }

    // console.log(result.rows[0].user_id);
    const token = jwt.sign(
      String(result.rows[0].user_id),
      process.env.JWT_SHH as string
    );

    return res.send({
      token: token,
    });
  }
);

router.post(
  "/signup",
  validateRequest({
    body: z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      password: z.string(),
      major_interests: z.array(z.string()),
      college_budget: z.number(),
      location: z.array(z.string()),
      sports: z.array(z.string()),
    }),
  }),
  async (req, res) => {
    const body = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = bcrypt.hash(body.password, salt);

    const result = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password, major_interests, college_budget, location, sport) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id",
      [
        body.first_name,
        body.last_name,
        body.email,
        hashed_password,
        body.major_interests,
        body.college_budget,
        body.location,
        body.sports,
      ]
    );

    const token = jwt.sign(
      String(result.rows[0].user_id),
      process.env.JWT_SHH as string
    );

    return res.send({
      token: token,
    });
  }
);

export default router;
