import mongoose from "mongoose";

// Defining Schema
const assets = new mongoose.Schema({
  assetSymbol: { type: String, required: true, trim: true },
  assetName: { type: String, required: true, trim: true },
  assetPrice: { type: Number, required: true, trim: true },
  purchasedDate: {type:Date,required:true,default: new Date().getDate()},
  assetType:{type:String,required:false},
  assetQuantity:{type:Number,required:true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Use ref to reference UserModel
});

// Model
const AssetModel = mongoose.model("purchasedAssets", assets)
export default AssetModel

