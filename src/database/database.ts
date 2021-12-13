import config from "../../config/defaults";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
      try{
            const mongoURI: string = config.mongoURI;
            const options: ConnectionOptions = {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            };
            await connect(mongoURI, options);
            console.log("MongoDB Connected...");
      } catch(err) {
            console.error(err.message);
            process.exit(1);
      }
};

export default connectDB;


