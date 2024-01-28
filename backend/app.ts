import express from "express";
import authentication from "./routes/authentication";
import "dotenv/config";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/auth", authentication);

app.listen(PORT, () => console.log("listening on port " + PORT));
