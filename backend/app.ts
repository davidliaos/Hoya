import express from "express";
import { authentication, home } from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authentication);
app.use("/api/home", home);

app.listen(PORT, () => console.log("listening on port " + PORT));
