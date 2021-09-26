import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import mongooose from "mongoose";

dotenv.config();

const app = express();

mongooose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

app.use(cors());

app.use(express.json());

app.use("/api/v1/", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
