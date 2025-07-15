import { User } from '../models/user.model.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
           return res.status(404).json({
            message:"user not found!",
            success:false
           })
        }

        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
       console.log(error);
       res.status(500).json({
        message:error,
        success:false
       })
    }
}