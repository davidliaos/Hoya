import { Pool } from "pg";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://boss:12345678a!@admissions.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000",
  {
    connectTimeoutMS: 60000,
  }
);

const vector = client.db("langchain").collection("vector-db");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: "postgres",
  port: Number(process.env.PGPORT),
  query_timeout: 2,
  statement_timeout: 2,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 5000,
});

pool.query(`CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY, 
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL,
  major_interests VARCHAR(50)[] NOT NULL,
  college_budget INT NOT NULL,
  location VARCHAR(50)[] NOT NULL,
  sport VARCHAR(50)[] NOT NULL
);`);

export { pool, client, vector };
