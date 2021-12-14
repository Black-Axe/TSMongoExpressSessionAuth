import connectDB from "./database";
import { DBPopulate } from "./Populate";

async function initAndFill() {
    await connectDB();
    await DBPopulate();
}

export default initAndFill;