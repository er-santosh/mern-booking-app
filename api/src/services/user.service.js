import User from "../models/user.model.js";
import { generateError } from "../utils/generate-error.util.js";

const userService = {
  async create(userObj) {
    const user = new User(userObj);
    try {
      return await user.save();
    } catch (error) {
      throw error;
    }
  },
  async findByUsername(username) {
    try {
      const user = await User.findOne({
        username,
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  async findAll() {
    try {
      return await User.find();
    } catch (error) {
      throw error;
    }
  },
  async findOne(UserId) {
    try {
      const user = await User.findById(UserId).select("-password -isAdmin");
      if (!user) throw generateError(404, "User not found");

      return user;
    } catch (error) {
      throw error;
    }
  },
  async update(UserId, UserObj) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        UserId,
        {
          $set: UserObj,
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw generateError(404, "User not found");
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
  async delete(UserId) {
    try {
      const deletedUser = await User.findByIdAndRemove(UserId);
      if (!deletedUser) throw generateError(404, "User not found");
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
