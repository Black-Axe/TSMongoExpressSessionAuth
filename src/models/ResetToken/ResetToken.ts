import {Document, model, Schema} from 'mongoose';

//interface to model the resetToken schema
//@param resetToken: string
//@param user: string
//@param expires: Date

export interface IResetToken extends Document {
      resetToken: string;
      user: string;
      createdAt: Date;
      
}
const ResetTokenSchema: Schema = new Schema({
    resetToken: {
        type: String,
        required: true,
    },
    user: 
      {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      createdAt: {
            type: Date,
            required: true,
      },
});

const ResetToken = model<IResetToken>('ResetToken', ResetTokenSchema);

export default ResetToken;