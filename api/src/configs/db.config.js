import mongoose from "mongoose";

const mongoConnection = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error: "));
db.once("open", () => {
  console.log("DB Connected successfully");
});

export default mongoConnection;
