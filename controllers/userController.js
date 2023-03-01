import Deal from "../models/dealModel.js";
import router from "../routes/adminRoute.js";


//get all unexpired deals

export const getAllDeals = async (req, res) => {
  
  try {
    const deals = await Deal.find({
      availableUnits: { $gt: 0 },
      expiryTime: { $gte: Date.now() },
    });

    //for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const indexOfFirstItem = (page - 1) * limit;
    const indexOfLastItem = page * limit;

    const dealsData = {};
    if (indexOfLastItem < deals.length) {
      dealsData.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (indexOfFirstItem > 0) {
      dealsData.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    

    dealsData.deals = deals.slice(indexOfFirstItem, indexOfLastItem);
    res.status(200).json(dealsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
