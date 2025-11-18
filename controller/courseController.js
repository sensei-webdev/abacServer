import Course from "../model/courseModel.js";

export const create = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const { courseName } = newCourse;

    const courseExists = await Course.findOne({ courseName });
    if (courseExists) {
      return res.status(400).json({ message: "Course already exists." });
    }

    const savedData = await newCourse.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "Course created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courseData = await Course.find();
    if (!courseData || courseData.length === 0) {
      return res.status(404).json({ message: "user data not found " });
    }
    res.status(200).json({ courseData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const courseExists = await Course.findById(id);
    if (!courseExists) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(courseExists);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const courseExists = await Course.findById(id);
    if (!courseExists) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatedData = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json({ updatedData });
    res.status(200).json({ message: "Course updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Toggle activeStatus
export const toggleStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.activeStatus = !course.activeStatus; // toggle
    await course.save();

    res.status(200).json({
      message: "Status updated",
      activeStatus: course.activeStatus,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courseExists = await Course.findById(id);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET TOTAL COURSE COUNT
export const getCourseCount = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while counting course", error: error.message });
  }
};

export const getCourseStatusCount = async (req, res) => {
  try {
    const activeCourses = await Course.countDocuments({
      activeStatus: true,
      deletedAt: null,
    });

    const inactiveCourses = await Course.countDocuments({
      activeStatus: false,
      deletedAt: null,
    });

    return res.status(200).json({
      success: true,
      data: {
        activeCourses,
        inactiveCourses,
      },
    });
  } catch (error) {
    console.error("Error fetching course status counts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
