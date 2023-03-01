import Deal from "../models/dealModel.js";
import { validateInput, validateUpdate } from "../helper/validateInput.js";



//validate the input and create a new lightning deal

export const createNewDeal = async (req, res) => {
  const validationError = await validateInput(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const deal = new Deal({
    productName: req.body.productName,
    actualPrice: req.body.actualPrice,
    finalPrice: req.body.finalPrice,
    totalUnits: req.body.totalUnits,
    availableUnits: req.body.availableUnits,
    expiryTime: new Date(req.body.expiryTime),
  });
  try {
    const newDeal = await deal.save();
    res.status(201).json(newDeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



//update an existing lightning deal

export const updateDeal = async (req, res) => {
  const validationError = await validateUpdate(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) throw new Error("Deal not found");

    deal.productName = req.body.productName || deal.productName;
    deal.actualPrice = req.body.actualPrice || deal.actualPrice;
    deal.finalPrice = req.body.finalPrice || deal.finalPrice;
    deal.totalUnits = req.body.totalUnits || deal.totalUnits;
    deal.availableUnits = req.body.availableUnits || deal.availableUnits;
    deal.expiryTime = req.body.expiryTime || deal.expiryTime;
    deal.updatedAt = Date.now();
    
    const updatedLightningDeal = await deal.save();
    res.status(200).json(updatedLightningDeal);

  } catch (error) {
    res.status(400).json({message: error.message})
  }
};


