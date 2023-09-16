import AssetsModel from '../models/PurchasedAssets.js'
import Transaction from '../models/Transactions.js';
import UserModel from '../models/User.js';
import { getCurrentStockPrice } from './stockController.js';
import multiparty from "multiparty"


class AssetsController {

  

   
    
    static purchaseAsset = async (req, res) => {

      const { assetSymbol, assetName,assetType,assetPrice,assetQuantity } = req.body;
        if(!assetName || !assetPrice || !assetSymbol || !assetType || !assetQuantity){
            res.send({
                status:400,
                message:"Please provide the required data"
            })
       }

      try {
        // Find the existing user by userId
        const existingUser = req.user;
        console.log(existingUser._id.toString());
        const newAssetItem = new AssetsModel({
          userId: existingUser._id, // Use the _id of the existing user document
          assetSymbol: assetSymbol,
          assetPrice:assetPrice,
          assetName: assetName,
          assetQuantity:assetQuantity,
          assetType: assetType?.toLowerCase() == 'c' ? "CRYPTO" : "STOCK",
        });

        // create a transaction
        const user = await UserModel.findOne({_id:req.user});
        console.log(user)
        if(user.availableTokens < assetPrice*assetQuantity){
            return res.send({
                status:200,
                message:"Cannot purchase the asset due to low funds"
            });
        }
        user.availableTokens -= assetPrice*assetQuantity;
        await user.save();
        await newAssetItem.save();

        const transaction = new Transaction({
            userId: existingUser._id,// Use the _id of the existing user document
            price:assetPrice,
            type:"BUY",
            symbol:assetSymbol,
            
        });
        transaction.save();
        return res.status(201).send({ status: 'success', message: 'Asset Purchased successfully' });
      } catch (error) {
        console.error(error);
        return  res.status(500).send({ status: 'failed', message: 'Cannot purchase asset' });
      }
    };

    static sellAsset = async (req,res)=>{
        const {assetId} = req.body;
        
        try{

            const asset = await AssetsModel.findById({_id:assetId});
            if(!asset){
                return res.send({
                    status:400,
                    message:"Asset not found"
                })
            }

            const user = await UserModel.findById({_id:req.user._id});
            if(!user){
                return res.send({
                    status:500,
                    message:"Failed to perform the operation"
                })
            }
            const currentPrice= await getCurrentStockPrice(asset.assetSymbol);
            console.log("curr spri : ",asset,currentPrice)
            user.availableTokens += asset.assetQuantity * currentPrice
            await user.save();

            await AssetsModel.deleteOne({_id:assetId});
           
            const transaction = new Transaction({
              userId: user._id,// Use the _id of the existing user document
              price:currentPrice,
              type:"SELL",
              symbol:asset.assetSymbol,
              
            });

            await transaction.save();
            // create a transaction
            return res.send({
                status:200,
                message:"Asset sold successfully"
            });
          }catch(err){
            console.log("Error occured while getting assets data",err)
          }   
    }

    static getPurchasedAssets = async (req,res) =>{
        console.log(req.user);
        try{
          const assets = await AssetsModel.find({
            userId:req.user._id
          });

          return res.send(assets);
        }catch(err){
          console.log("Error occured while getting assets data")
        }
    }
  }
export default AssetsController;

