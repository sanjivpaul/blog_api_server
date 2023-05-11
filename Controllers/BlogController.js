const BlogModel = require("../Models/BlogModel");

module.exports.getBlogs = async (request, response) => {
  try {
    let result = await BlogModel.find();
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
