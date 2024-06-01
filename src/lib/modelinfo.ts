import mongoose from "mongoose";


const modelInfo = new mongoose.Schema({
    name:String,
    email:String,
    image:String
})

const Data = mongoose.models.Data || mongoose.model("Data",modelInfo)

export default Data 