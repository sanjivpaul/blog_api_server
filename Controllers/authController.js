const UserModel = require("../Models/Users");
const bcrypt = require("bcrypt");

//REGISTER
module.exports.getUsersRegister = async (request, response) => {
  try {
    //pass encrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(request.body.password, salt);

    const newUsers = new UserModel({
      username: request.body.username,
      email: request.body.email,
      password: hashedPass,
    });

    let user = await newUsers.save();
    response.status(200).send({
      status: true,
      user,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

// //LOGIN
module.exports.getUsersLogin = async (request, response) => {
  try {
    //check username
    const user = await UserModel.findOne({
      username: request.body.username,
    });
    if (user == null) {
      response.status(400).send({
        status: false,
        message: "Wrong credentials!",
      });
    } else {
      //check password
      const validated = await bcrypt.compare(
        request.body.password,
        user.password
      );

      //hide user password
      const { password, ...others } = user._doc;

      if (validated) {
        response.status(200).send({
          status: true,
          others,
        });
      } else {
        response.status(400).send({
          status: false,
          message: "Wrong credentials!",
        });
      }
    }
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
