import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import courseRoute from "./routes/coursesRoute.js";
import cors from "cors";
import NewsRoute from "./routes/newsRoute.js";
import clerkWebhookRoute from "./routes/clerkWebhookRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());

// ⚠️ IMPORTANT:
// Clerk Webhook MUST be BEFORE bodyParser/json
// and MUST NOT use express.json() or bodyParser.json()
app.use("/api/clerk", clerkWebhookRoute);

// Normal JSON parser for all other routes
app.use(bodyParser.json());

// Your normal API routes
app.use("/api", route);
app.use("/courseapi", courseRoute);
app.use("/newsapi", NewsRoute);

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
