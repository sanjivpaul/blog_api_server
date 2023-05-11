const { request, response } = require("express");
const CategoryModel = require("../Models/Category");

//CREATE CATEGORY
module.exports.createCategory = async (request, response) => {
  //fetch category
  const newCat = new CategoryModel(request.body);
  try {
    //save category
    const savedCat = await newCat.save();

    response.status(200).send({
      status: true,
      savedCat,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

//ALL CATEGORY
module.exports.getALLCategory = async (request, response) => {
  try {
    //find all category
    const cats = await CategoryModel.find();

    response.status(200).send({
      status: true,
      cats,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
