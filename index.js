import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import courseRoute from "./routes/coursesRoute.js";
import cors from "cors";
import NewsRoute from "./routes/newsRoute.js";
import clerkWebhookRoute from "./routes/clerkWebhookRoute.js";
import BlogRoute from "./routes/blogRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());

// Normal JSON parser
app.use(express.json());

// Clerk Webhook FIRST (no JSON parsing)
app.use("/api/clerk", clerkWebhookRoute);

// Your API routes
app.use("/api", route);
app.use("/courseapi", courseRoute);
app.use("/newsapi", NewsRoute);
app.use("/blogapi", BlogRoute);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connect successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
