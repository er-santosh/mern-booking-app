import express from "express";
import env from "dotenv";
import mongoConnection from "./configs/db.config.js";
import {
  AuthRoutes,
  HotelRoutes,
  RoomRoutes,
  UserRoutes,
} from "./routes/index.js";
import errorHandler from "./utils/error.util.js";
import responseHandler from "./utils/response.util.js";
import cookieParser from "cookie-parser";
env.config();

const app = express();

/* middlewares */
// accept application/json
app.use(express.json());
app.use(cookieParser());
// response handler
app.use(responseHandler);

/* routes */
app.use("/auth", AuthRoutes);
app.use("/hotels", HotelRoutes);
app.use("/users", UserRoutes);
app.use("/rooms", RoomRoutes);

/* error handler */
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await mongoConnection();
  console.log(`Server running on port ${PORT}`);
});
