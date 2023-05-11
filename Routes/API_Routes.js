//01.import express
const express = require("express");

//02.create instance
const router = express.Router();

//import controllers
const Auth = require("../Controllers/authController");
const User = require("../Controllers/UsersController");
const postController = require("../Controllers/PostsControllers");
const categorie = require("../Controllers/CategoryController");

//03.routes
router.get("/", (request, response) => {
  response.status(200).send("this is home page");
});

//auth:
router.post("/api/auth/register", Auth.getUsersRegister);
router.post("/api/auth/login", Auth.getUsersLogin);

//UserUpdate
router.put("/api/users/:id", User.userUpdate);
router.delete("/api/users/:id", User.userDelete);
router.get("/api/users/:id", User.getUser);

//Posts
router.post("/api/posts", postController.createPost);
router.put("/api/posts/:id", postController.updatePost);
router.delete("/api/posts/:id", postController.deletePost);
router.get("/api/posts/:id", postController.getPost);
router.get("/api/posts/", postController.getAllPosts);

//Category
router.post("/api/categories/", categorie.createCategory);
router.get("/api/categories", categorie.getALLCategory);

//04.export routes
module.exports = router;
