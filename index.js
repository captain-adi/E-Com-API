import { connection } from "./src/DB/db.js";
import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/product_route.js";
import categoryRoutes from "./src/routes/category_route.js";
const app = express();
app.use(cors());
connection();
app.listen(process.env.PORT, () => {
  console.log(`Database is listing at PORT : ${process.env.PORT}`);
});

app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

// app.get("/api/create", async (req, res) => {
//   const data = await Product.create(productData);
//   console.log(data);
//   res.send("all product is created");
// });

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).send({ success: false, message });
});
