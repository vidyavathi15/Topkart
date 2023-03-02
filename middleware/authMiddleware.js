import jwt from "jsonwebtoken";


//


//jwt secret
const secret = 'TOPKARTSECRET';

/*
user authentication middleware (token comming from authorization header will be checked and
verified before user is able to access any route)
*/

const authMiddleWare = async(req,res,next) => {
    try{
        const token = req.headers.authorization;
        if(token){
            const decoded = jwt.verify(token, secret);
            if(decoded){
                req.body._id = decoded?.id;
                console.log(Date.now());
                next();    
            }
            
        }
    }catch (error){
        console.log(error);
        res.status(500).json("token expired")
    }

}

export default authMiddleWare;