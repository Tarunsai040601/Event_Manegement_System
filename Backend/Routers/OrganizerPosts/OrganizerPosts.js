// initialistion express
const expree = require("express");
const {
  getpostController,

  getbyidcontroller,
  postController,
  updatepostcontroller,
  deletepostcontroller,
} = require("../../Controllers/OrganisationPostController/organizepostController.js");
const upload = require("../../Middleware/Multer/Multer.js");
const authMiddleware = require("../../Middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../Middleware/RoleMiddleware/RoleMiddleware.js");

// store the express with router
const organizerPost = expree.Router();

organizerPost.get("/get", getpostController);
organizerPost.post(
  "/post",
  authMiddleware,
  roleMiddleware("organizer"),
  upload.single("image"),
  postController,
);

organizerPost.patch(
  "/update/:id",
  authMiddleware,
  roleMiddleware("organizer"),
  upload.single("image"),
  updatepostcontroller,
);

organizerPost.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("organizer"),
  deletepostcontroller,
);

// module exports
module.exports = organizerPost;
