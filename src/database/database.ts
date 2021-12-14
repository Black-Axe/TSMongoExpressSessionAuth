import config from "../../config/defaults";
import { ConnectOptions, connect } from "mongoose";

const connectDB = async () => {
      try{
            const mongoURI: string = config.mongoURI;
            await connect(mongoURI);
            console.log("MongoDB Connected...");
      } catch(err) {
            console.error(err.message);
            process.exit(1);
      }
};

export default connectDB;


