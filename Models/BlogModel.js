//01.import mongoose
const mongoose = require("mongoose");
//02.create schema instance
const Schema = mongoose.Schema;

//03.create schema
const BlogSchema = new Schema({
  title: { type: String },
  desc: { type: String },
  contact: { type: Number },
});

//04.
const BlogModel = mongoose.model("blog", BlogSchema, "blogs");

//export model
module.exports = BlogModel;
