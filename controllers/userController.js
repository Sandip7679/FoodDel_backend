import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel, { adminModel } from "../models/userModel.js";

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user
const loginUser = async (req, res) => {
  const { email, password, type } = req.body;
  console.log("type...", type);
  try {
    let user;
    if (type == "admin") {
      user = await adminModel.findOne({ email });
    } else {
      user = await userModel.findOne({ email });
    }

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password, type } = req.body;
  try {
    //check if user already exists
    // let exists;
    // if (type == "admin") {
    //   exists = await adminModel.findOne({ email });
    // } else {
    //   exists = await userModel.findOne({ email });
    // }
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);
    // let newUser;
    // if (type == "admin") {
    //   newUser = new adminModel({ name, email, password: hashedPassword });
    // } else {
    //   newUser = new userModel({ name, email, password: hashedPassword });
    // }
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
