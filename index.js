import { connection } from "./src/DB/db.js";
import express from "express";
import Product from "./src/models/product_model.js";
import cors from "cors";
import { Category } from "./src/models/category_model.js";
const app = express();
// Enable CORS
app.use(cors());
connection();
app.listen(process.env.PORT, () => {
  console.log(`Database is listing at PORT : ${process.env.PORT}`);
});
app.get("/",(req,res)=>{
    res.send("landing page")
})


app.get("/api/category",async(req,res)=>{
const categoryData = await Category.find();
res.send(categoryData)
})

app.get("/api/product", async (req, res) => {
const data = await Product.find();
res.send(data)
});
