import Blog from "../model/blogModel.js";

// CREATE BLOG
export const create = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const { title } = newBlog;

    const blogExists = await Blog.findOne({ title });
    if (blogExists) {
      return res.status(400).json({ message: "Blog already exists." });
    }

    await newBlog.save();
    res.status(200).json({ message: "Blog created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogData = await Blog.find();
    if (!blogData || blogData.length === 0) {
      return res.status(404).json({ message: "No blogs found." });
    }
    res.status(200).json({ blogData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET BLOG BY ID
export const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blogExists = await Blog.findById(id);

    if (!blogExists) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json(blogExists);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE BLOG
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const blogExists = await Blog.findById(id);

    if (!blogExists) {
      return res.status(404).json({ message: "Blog not found." });
    }

    await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Blog updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blogExists = await Blog.findById(id);

    if (!blogExists) {
      return res.status(404).json({ message: "Blog not found." });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET TOTAL BLOG COUNT
export const getBlogCount = async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      message: "Error while counting blogs",
      error: error.message,
    });
  }
};
