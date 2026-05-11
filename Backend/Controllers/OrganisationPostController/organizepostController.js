const postModel = require("../../Model/OrganizerPost/OrganizerSchema.js");
const cloudinary = require("../../Middleware/Cloudinary/Cloudinary.js");

// ================= CREATE POST =================
const postController = async (req, res) => {
  try {
    const {
      title,
      desc,
      category,
      venu,
      seatlimit,
      date,
      price,
    } = req.body;

    if (!title || !desc || !category || !venu || !seatlimit || !date || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";

    // upload image to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "organizer_posts",
      });

      imageUrl = result.secure_url;
    }

    const newPost = new postModel({
      title,
      desc,
      category,
      venu,
      seatlimit,
      date,
      price,
      image: imageUrl,
      createdBy: req.user?.id, // from auth middleware
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL POSTS =================
const getpostController = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY ID =================
const getbyidcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE POST =================
const updatepostcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    console.log("UPDATE BODY:", req.body);

    //  SAFE mapping (IMPORTANT FIX)
    let updatedData = {
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      venu: req.body.venu,
      seatlimit: req.body.seatlimit,
      date: req.body.date,
      price: req.body.price,
    };

    // 🖼️ Image update (Cloudinary)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "organizer_posts",
      });

      updatedData.image = result.secure_url;
    }

    // 🔥 Update query
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE POST =================
const deletepostcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= EXPORT =================
module.exports = {
  getpostController,
  postController,
  getbyidcontroller,
  updatepostcontroller,
  deletepostcontroller,
};