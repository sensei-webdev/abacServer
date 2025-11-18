import News from "../model/newsModel.js";

export const create = async (req, res) => {
  try {
    const newNews = new News(req.body);
    const { title } = newNews;

    const newsExists = await News.findOne({ title });
    if (newsExists) {
      return res.status(400).json({ message: "News already exists." });
    }

    const savedData = await newNews.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "News created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const newsData = await News.find();
    if (!newsData || newsData.length === 0) {
      return res.status(404).json({ message: "No news found." });
    }
    res.status(200).json({ newsData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const newsExists = await News.findById(id);
    if (!newsExists) {
      return res.status(404).json({ message: "News not found." });
    }
    res.status(200).json(newsExists);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const newsExists = await News.findById(id);
    if (!newsExists) {
      return res.status(404).json({ message: "News not found." });
    }
    const updatedData = await News.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json({ updatedData });
    res.status(200).json({ message: "News updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    const newsExists = await News.findById(id);
    if (!newsExists) {
      return res.status(404).json({ message: "News not found." });
    }
    await News.findByIdAndDelete(id);
    res.status(200).json({ message: "News deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET TOTAL NEWS COUNT
export const getNewsCount = async (req, res) => {
  try {
    const count = await News.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while counting news", error: error.message });
  }
};
