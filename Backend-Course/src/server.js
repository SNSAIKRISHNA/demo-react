import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
//Import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config();
connectDB();

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const PORT = 5001;

// GET,POST,PUT,DELETE
app.get("/sai", (req, res) => {
  res.json({ message: "Hello form server" });
});

const server = app.listen(PORT, () => {
  console.log("server is running  pn port", PORT);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection: ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.error(`uncaughtException: ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received");
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
