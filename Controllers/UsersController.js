const UserModel = require("../Models/Users");
const PostModel = require("../Models/Posts");
const bcrypt = require("bcrypt");

//UPDATE
module.exports.userUpdate = async (request, response) => {
  if (request.body.userId === request.params.id) {
    //password
    if (request.body.password) {
      const salt = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password, salt);
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body, //this will update our user
        },
        { new: true }
      );

      response.status(200).send({
        status: true,
        updatedUser,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  } else {
    response.status(401).send({
      status: false,
      message: "You can update only your account",
    });
  }
};

//DELETE
module.exports.userDelete = async (request, response) => {
  if (request.body.userId === request.params.id) {
    try {
      const user = await UserModel.findById(request.params.id);
      try {
        await PostModel.deleteMany({ username: user.username }); //post model

        await UserModel.findByIdAndDelete(request.params.id);
        response.status(200).send({
          status: true,
          message: "User has been deleted...",
        });
      } catch (error) {
        response.status(500).send({
          status: false,
          error,
        });
      }
    } catch (error) {}
  } else {
    response.status(404).send({
      status: false,
      message: "You can delete only your account!",
    });
  }
};

//GET USER
module.exports.getUser = async (request, response) => {
  try {
    const user = await UserModel.findById(request.params.id);
    const { password, ...others } = user._doc;

    response.status(200).send({
      status: true,
      others,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
