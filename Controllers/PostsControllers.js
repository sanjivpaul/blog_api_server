const UserModel = require("../Models/Users");
const PostModel = require("../Models/Posts");

//CREATE POST
module.exports.createPost = async (request, response) => {
  const newPost = new PostModel(request.body);
  try {
    //save new posts
    const savedPost = await newPost.save();

    response.status(200).send({
      status: true,
      savedPost,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

//UPDATE POST
module.exports.updatePost = async (request, response) => {
  try {
    const post = await PostModel.findById(request.params.id);

    //check user validation
    if (post.username === request.body.username) {
      try {
        //update the post
        const updatedPost = await PostModel.findByIdAndUpdate(
          request.params.id,
          {
            $set: request.body,
          },
          { new: true }
        );

        response.status(200).send({
          status: true,
          updatedPost,
        });
      } catch (error) {
        response.status(500).send({
          status: false,
          error,
        });
      }
    } else {
      response.status(401).send({
        message: "You can update only your post!",
      });
    }
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

//DELETE POST
module.exports.deletePost = async (request, response) => {
  try {
    //collect data from mongoose
    const post = await PostModel.findById(request.params.id);

    //check user validation
    if (post.username === request.body.username) {
      try {
        //delete the post
        await post.delete();

        response.status(200).send({
          status: true,
          message: "Post has been deleted...",
        });
      } catch (error) {
        response.status(500).send({
          status: false,
          error,
        });
      }
    } else {
      response.status(401).send({
        message: "You can delete only your post!",
      });
    }
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

//GET POST
module.exports.getPost = async (request, response) => {
  try {
    //fetch by id
    const post = await PostModel.findById(request.params.id);

    response.status(200).send({
      status: true,
      post,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

//GET ALL POSTS
module.exports.getAllPosts = async (request, response) => {
  const username = request.query.user; // /?user=value
  const catName = request.query.cat; // categorie
  try {
    let posts; // post array
    //if user is match show posts
    if (username) {
      posts = await PostModel.find({ username });
      //if user is match show posts
    } else if (catName) {
      posts = await PostModel.find({
        categories: {
          $in: [catName],
        },
      });
      //if no condition is there show all the posts
    } else {
      posts = await PostModel.find();
    }

    response.status(200).send({
      status: true,
      posts,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
