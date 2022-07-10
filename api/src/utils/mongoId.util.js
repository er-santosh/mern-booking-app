import mongoose from "mongoose";
const isValidMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export default isValidMongoId;
