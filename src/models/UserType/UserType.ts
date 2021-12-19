import {Document, Model, model, Schema} from 'mongoose';
import accessTypes from "./config";

export interface IUserType extends Document {
      accessRights: string;
}
const UserTypeSchema: Schema = new Schema({
    accessRights: {
        type: String,
        required: true,
        default: accessTypes.user,
    }
});

const UserType = model<IUserType>('UserType', UserTypeSchema);

export default UserType;