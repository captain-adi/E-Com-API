import { connection } from "./src/DB/db.js";
import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/product_route.js";
import categoryRoutes from "./src/routes/category_route.js";
import authRoutes from "./src/routes/auth_route.js";
import cookieParser from "cookie-parser";
import passport from "passport";
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

connection();
app.listen(process.env.PORT, () => {
  console.log(`Database is listing at PORT : ${process.env.PORT}`);
});

app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);

// app.get("/api/create", async (req, res) => {
//   const data = await Product.create(productData);
//   console.log(data);
//   res.send("all product is created");
// });

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).send({ success: false, message });
});
