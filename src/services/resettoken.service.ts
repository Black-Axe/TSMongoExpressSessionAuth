import User, {IUser}from "../models/User/User";
import ResetToken from "../models/ResetToken/ResetToken";
import jwt from 'jsonwebtoken';
//return of the function
export interface IResetTokenReturn{
      resetToken: string;
      error: boolean;
}
export const generateJWTToken = (user:IUser) => {
      let payload = {
            user:{
                  id: user._id,
            }
      }
      let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30m'});
      return token;
};

//this will be used to create a new reset token for our user
//middle ware will handle the user validation
export const createResetToken = async ({email, username}:{email?:string, username?:string}) => {
      //check if the user exists by email or username
      let user:IUser;
      if(email){
            console.log("recieved email");
            user = await User.findOne({email:email});
      }else if(username){
            console.log("recieved username");
            user = await User.findOne({username:username});
      }
      if(!user){
            return {
                  error: true
            }
      }
      //check if an existing reset token exists for the user
      let resetToken = await ResetToken.findOne({user:user._id});
      if(resetToken){
            //if the token exists we will delete it and create a new one
            await resetToken.remove();
      }
      //create a new reset token
      let newResetToken = new ResetToken({
            user: user._id,
            resetToken: generateJWTToken(user),
            createdAt: new Date()
      });
      //save the new reset token
      console.log("saving new reset token");
      console.log(newResetToken);
      await newResetToken.save();

      return{
            resetToken: newResetToken.resetToken,
      }
        
};

export const verifyJWTToken =  (token:string) => {
      console.log("decoding token");
      try{
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded token");
            return {
                  error: false,
                  decoded: decoded
            }
      }catch(err){
            return {
                  error: true,
                  message: err.message
            }
      }
}