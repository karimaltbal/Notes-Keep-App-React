const asynchandler = require("express-async-handler");
const User = require("../models/userModel")
const genToken = require("../utils/generateToken")

const registerUser = asynchandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("this user aready exist")
    }

    const user = await User.create({name, email, password, pic})
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: genToken(user._id)
        });
    }else{
        res.status(400)
        throw new Error("Error accoard!")
    }
});


const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist && (await userExist.matchPassword(password))) {
    res.json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
      pic: userExist.pic,
      token: genToken(userExist._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});



const FetchUsers = asynchandler(async (req, res) => {

  const userExist = await User.find();
  if (!userExist) {
    res.status(400);
    throw new Error("no user");
  }else{
    res.status(200).json(userExist)
  }
});


const updateUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, loginUser, FetchUsers, updateUserProfile };