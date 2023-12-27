import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import express from "express";
import BookRoutes from "./routes/booksRoute.js";
import cors from "cors";
import { Book } from "./models/bookModel.js";

const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLİCY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2 : Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", BookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// get
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello");
});
