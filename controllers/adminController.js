import Deal from "../models/dealModel.js"
import { validateInput } from "../helper/validateInput.js"

export const createNewDeal = async(req,res) => {
    const validationError = await validateInput(req.body)
    if(validationError){
        return res.status(400).json({error: validationError})
    }

    const deal = new Deal({
        productName: req.body.productName,
        actualPrice: req.body.actualPrice,
        finalPrice: req.body.finalPrice,
        totalUnits: req.body.totalUnits,
        availableUnits: req.body.availableUnits,
        expiryTime: new Date(req.body.expiryTime)
      });
      try {
           const newDeal = await deal.save();
           res.status(201).json(newDeal);      
      } catch (error) {
           res.status(400).json({message: error.message})
      }
    
}