import { connection } from "./src/DB/db.js";
import express from "express";
import Product from "./src/models/product_model.js";
import { data } from "./src/data/data.js";

const app = express();
connection();
app.listen(process.env.PORT, () => {
  console.log(`Database is listing at PORT : ${process.env.PORT}`);
});
app.get("/",(req,res)=>{
    res.send("landing page")
})

app.get("/api/product", async (req, res) => {
const data = await Product.find();
res.send(data)
});
