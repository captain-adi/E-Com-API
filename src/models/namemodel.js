import mongoose from "mongoose";
export const nameSchmea = new mongoose.Schema({
    name : {
        type : String
    }
})
export const Name = mongoose.model("Name",nameSchmea)