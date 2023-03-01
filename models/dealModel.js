import mongoose from "mongoose";

const dealSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    actualPrice:{
        type:Number,
        required: true
    },
    finalPrice:{
        type:Number,
        required:true
    },
    totalUnits: { 
        type: Number,
        required: true 
    },
    availableUnits: {
        type: Number,
        required: true 
    },
    expiryTime: { 
        type: Date, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }

})

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;