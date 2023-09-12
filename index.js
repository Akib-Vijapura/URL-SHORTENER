import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
const app = express();

import connectDB from "./config/db.js";
import urlRouter from "./routes/url.js";

//connect to DB
connectDB();

app.use(express.json());
app.use("/api/url", urlRouter);

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
