import Deal from "../models/dealModel.js";


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



// place order for a lightning deal

export const placeOrder = async(req,res) => {
    const id = req.params.id;
    const deal = await Deal.findById(req.params.id);

    if(!deal){
        return res.status(404).json({error:'Deal does not exist'})
    }
    if(deal.expiryTime < Date.now()){
        return res.status(400).json({error:'Deal expired'})
    }
    if(req.body.requiredUnits <= 0){
        return res.status(400).json({error:"Required Units number is invalid"})
    }
    if(req.body.requiredUnits > deal.availableUnits){
        return res.status(400).json({error:"Requested number of units not available"})
    }

    deal.availableUnits -= req.body.requiredUnits;
    
    const updateDeal = await deal.save();
   
    const orderDetails = {
        deal: updateDeal._id,
        email: req.body.email,
        status: 'pending'
    }

    res.status(200).json(orderDetails)
}