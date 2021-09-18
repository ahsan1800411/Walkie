const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      ctx,
      info
    ) {
      if (!username || !email || !password || !confirmPassword) {
        throw new Error("Please fill the required fields");
      }
      if (password !== confirmPassword) {
        throw new Error("Password Must be Match");
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new UserInputError("Email Already Existed", {
          errors: {
            email: "This email is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = jwt.sign(
        { id: res.id, username: res.username, email: res.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(parent, { username, password }, ctx, info) {
      if (!username || !password) {
        throw new Error("Please fill the required fields");
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not Found");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Wrong Credentials Entered");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
