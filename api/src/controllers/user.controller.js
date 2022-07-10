import UserService from "../services/user.service.js";

export const getAllUser = async (req, res, next) => {
  try {
    const Users = await UserService.findAll();
    res.fetched(Users);
  } catch (err) {
    next(err);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const User = await UserService.findOne(req.params.id);
    res.fetched(User);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const product = await UserService.update(req.params.id, req.body);
    res.updated("User", product);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await UserService.delete(req.params.id);
    res.deleted("User", deletedUser);
  } catch (error) {
    next(error);
  }
};
