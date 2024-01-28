import express from "express";
import { authentication, home, chatbot } from "./routes";
import { WebSocketExpress } from "websocket-express";
import cors from "cors";
import "dotenv/config";

const app = new WebSocketExpress();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authentication);
app.use("/api/home", home);
app.use("/api/chatbot", chatbot);

app.listen(PORT, () => console.log("listening on port " + PORT));
