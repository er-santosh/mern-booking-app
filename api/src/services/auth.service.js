import userService from "./user.service.js";
import bcrypt from "bcrypt";
import { generateError } from "../utils/generate-error.util.js";
import jwt from "jsonwebtoken";

const authService = {
  async register(userObj) {
    const { username, email, password } = userObj;

    const user = await userService.findByUsername(username);
    if (user) {
      throw generateError(400, "User already exist");
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userService.create({
        username,
        email,
        password: hashedPassword,
      });

      return {
        username: user.username,
        email: user.email,
      };
    } catch (error) {
      throw error;
    }
  },
  async login(username, input_password) {
    try {
      const user = await userService.findByUsername(username);
      if (!user) throw generateError(404, "Invalid credentials");
      const isValidPassword = await bcrypt.compare(
        input_password,
        user.password
      );
      if (!isValidPassword) {
        throw generateError(400, "Invalid credentials");
      }

      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );

      return {
        username: user.username,
        email: user.email,
        token,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
