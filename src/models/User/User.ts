import { Document, Model, model, Schema } from "mongoose";
import { IUserType } from "../UserType/UserType";
import UserType from "../UserType/UserType"
import userTypes from "../UserType/config";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 * @param userAccess: ref => [ UserType._id]
 */


export interface IUser extends Document {
      userAccess: IUserType["_id"];
      email: string;
      password: string;
      username: string;
      
}

const UserSchema: Schema = new Schema({
      email: {
            type: String,
            required: true,
            unique: true,
            
      },
      password: {
            type: String,
            required: true,
      },
      username: {
            type: String,
            required: true,
            unique: true,
      },
      userAccess: [
            {
                  type: Schema.Types.ObjectId,
                  ref: "UserType",
                  required: true,
            },
            ],
});

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;