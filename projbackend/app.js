// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

// const express = require("express");
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

//My Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import paymentBRoutes from "./routes/paymentBRoutes.js";

// var authRoutes = require("./routes/auth.js");

const app = express();
// mongoose.set({ returnOriginal: false });
// Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

// Middlewares
app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

// Port
const port = process.env.PORT || 8000;

// app.get("/", (req, res) => res.send("Home Page"));

// Starting Server
app.listen(port, () => {
  console.log(`App is running at port :  ${port}`);
});
