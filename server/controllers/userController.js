import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { getJWTwebToken } from "../utils/jwtTokenGeneration.js";
import { comparePasswords } from "../utils/hashPassword.js";

export const createUser = async (req, res,next) => {
  try {
    console.log(req.body);
    const password = req.body.password;
    const username = req.body.username;
    if (!(username && password)) {
      return res.status(404).send("username and password are mandatory");
    }

    const userExits = await User.findOne({ username: username });
    if (userExits) {
      return res.status(400).json({ msg: "user already exists" });
    } else {
      const user = await User.create({
        password: bcrypt.hashSync(password, 10),
        username: username.toLowerCase(),
      });
      res
        .cookie("access_token", getJWTwebToken(user._id, user.username), {
          httpOnly: true,
          secure: process.env.NODE_ENV == "Production"?true:false,
          sameSite: process.env.NODE_ENV == "Production"? "Strict":"Lax",
        })
        .status(201)
        .json({
          username: user.username,
          msg: "new user got created",
          isNew:true
        });
    }
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!(username && password)) {
      return res.status(404).json({ msg: "Email and password are required" });
    }
    const userExits = await User.findOne({
      username: username,
    }).orFail();

    if (userExits && comparePasswords(password, userExits.password)) {
      let cookieparams = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "Production" ? true : false,
        sameSite: process.env.NODE_ENV == "Production" ? "Strict" : "Lax",
      };
      console.log("iam here in the login");
      console.log(userExits);

      res
        .cookie(
          "access_token",
          getJWTwebToken(userExits._id, userExits.username),
          cookieparams
        )
        .status(201)
        .json({
          id: userExits._id,
          username: userExits.username,
          success: "user logged in",
          isNew:false
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").orFail();
    res.json({ users: user });
  } catch (err) {
    next(err);
  }
};
