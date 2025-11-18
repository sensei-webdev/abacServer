import mongoose from "mongoose";
import slugify from "slugify";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  sourceLink: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
});

// Generate slug automatically & handle duplicates
newsSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  // Check for duplicate slugs
  while (await mongoose.models.News.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

export default mongoose.model("News", newsSchema);
