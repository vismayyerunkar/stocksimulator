    import UserModel from '../models/User.js';
    import axios from 'axios';
    import mongoose from 'mongoose';
    import Goal from "../models/GoalTable.js"
    import GoalAssets from "../models/GoalAssestTable.js"

    class GoalController{

    static createGoal = async (req, res) => {
       const {goalAssets , goalDetails} = req.body;


       const goal = {
        userId: "650ad9baca9314903e5eb7af",
        ...goalDetails
       }

       const newGoal = new Goal(goal);
       const result = await newGoal.save();
       console.log(result);

       const transformedAssets = [];

       goalAssets?.forEach((asset)=>{
        transformedAssets.push({
            ...asset,
            goalId:result
        })
       });

       GoalAssets.insertMany(transformedAssets).then((result) => {
            console.log("data inserted : ",result);
       }).catch((err) => {
        console.log("error occured");
       });

       return res.send("Goal created successfully")
    }

    static getGoals = async (req,res)=>{
        const result = await Goal.find().where('_userId').in(["6515afbedd22bdd10f8ecf42"]).exec();
        return res.json({goals:result})
    }

    static  getGoalDetails = async (req,res)=>{
        const {goalId} = req.body;
        const goal = await Goal.findById(goalId);
        const assets = await Goal.find().where('_goalId').in([goalId]).exec();

        return res.json({
            goal:goal,
            goalAssets:assets
        })

    }
}
        
export default GoalController;
