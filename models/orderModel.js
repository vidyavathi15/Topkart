import mongoose  from "mongoose";

const orderSchema = mongoose.Schema({
    deal : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required :true
    },
    status : {
        type : String,
        required : true
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

export default Order;