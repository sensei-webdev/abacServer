import express from "express";
import User from "../model/userModel.js";
import { Webhook } from "svix";

const router = express.Router();

// Clerk Webhook Route
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const WH_SECRET = process.env.CLERK_WEBHOOK_SECRET;

      if (!WH_SECRET) {
        return res
          .status(500)
          .json({ message: "Missing Clerk Webhook Secret" });
      }

      // Clerk signature headers
      const svix_id = req.headers["svix-id"];
      const svix_timestamp = req.headers["svix-timestamp"];
      const svix_signature = req.headers["svix-signature"];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ message: "Missing svix headers" });
      }

      const svix = new Webhook(WH_SECRET);

      let event;

      try {
        // Verify event signature
        event = svix.verify(req.body, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        });
      } catch (err) {
        return res.status(400).json({ message: "Invalid webhook signature" });
      }

      const { data, type } = event;

      //
      // 🎉 USER CREATED IN CLERK
      //
      if (type === "user.created") {
        const email = data.email_addresses[0]?.email_address;

        const exists = await User.findOne({ clerkId: data.id });

        if (!exists) {
          await User.create({
            clerkId: data.id,
            email,
            firstName: data.first_name,
            lastName: data.last_name,
            image: data.image_url,
          });
        }
      }

      //
      // 📝 USER UPDATED IN CLERK
      //
      if (type === "user.updated") {
        const email = data.email_addresses[0]?.email_address;

        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email,
            firstName: data.first_name,
            lastName: data.last_name,
            image: data.image_url,
          },
          { new: true }
        );
      }

      //
      // 🗑 USER DELETED IN CLERK
      //
      if (type === "user.deleted") {
        await User.findOneAndDelete({ clerkId: data.id });
      }

      res.status(200).json({ received: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
