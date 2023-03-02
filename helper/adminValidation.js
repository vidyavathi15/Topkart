import User from "../models/userModel.js"
//helper function to verify admin

export const verifyAdmin = async(id) => {
     const data = await User.findById(id)
    if(!data?.isAdmin){
        return 'Admin authorization Failed'
    }
}