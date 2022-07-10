import { generateError } from "../utils/generate-error.util.js";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

export const hasToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(generateError(401, "Unauthenticated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(generateError(403, "Invalid access token"));
    req.user = user;
    next();
  });
};

export const IsAuthenticated = (req, res, next) => {
  hasToken(req, res, async () => {
    if (!req.user) return next(generateError(401, "Unauthenticated"));
    const user = await userService.findOne(req.user.id);
    req.currentUser = user;
    if (user) {
      next();
    } else {
      return next(generateError(403, "Unauthorised"));
    }
  });
};

export const IsAdmin = (req, res, next) => {
  IsAuthenticated(req, res, async () => {
    if (!req.user) return next(generateError(401, "Unauthenticated"));
    if (req.user.isAdmin) {
      next();
    } else {
      return next(generateError(403, "Unauthorised"));
    }
  });
};
