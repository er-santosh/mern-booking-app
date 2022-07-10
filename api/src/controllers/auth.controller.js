import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.created("User", user);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    const { token, ...other } = user;
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.success("User logged in successfully", other);
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    res.fetched(req.currentUser);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookies.access_token = null;
    res.success("User logged out successfully");
  } catch (error) {
    next(error);
  }
};
