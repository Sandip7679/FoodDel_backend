import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{type:Object,default:{}},
}, { minimize: false })

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
const adminModel = mongoose.model.admin || mongoose.model("admin", userSchema);
export default userModel;
export  {adminModel};