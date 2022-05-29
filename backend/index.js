import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

//para limitar el tamaño del envio de imagenes
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

dotenv.config();
const CONNECTION_URL = process.env.DB;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en el puerto: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
