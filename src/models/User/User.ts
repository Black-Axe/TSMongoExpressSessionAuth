import { model, Schema, PassportLocalDocument, PassportLocalSchema} from "mongoose";
import { IUserType } from "../UserType/UserType";
import passportLocalMongoose from "passport-local-mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email: string
 * @param username: string
 * @param userAccess: ref => [ UserType._id]
 * @param avatar: string
 */

//passport-local-mongoose will handle the password and hashing

export interface IUser extends PassportLocalDocument {
      userAccess: IUserType["_id"];
      email: string;
      username: string;
      avatar: string;
      
}

const UserSchema: PassportLocalSchema = new Schema({
      email: {
            type: String,
            required: true,
            unique: true,
            
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
      avatar: {
            type: String,
      },
});

UserSchema.plugin(passportLocalMongoose);

const User = model<IUser>("User", UserSchema);
export default User;