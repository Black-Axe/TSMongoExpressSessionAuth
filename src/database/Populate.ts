import UserType from "../models/UserType/UserType";
import userTypes from "../models/UserType/config";


async function isPopulated(): Promise<boolean> {
      const userTypes = await UserType.find();
      if(userTypes.length === 0){return false;}
      return true;
}

export async function DBPopulate():Promise<void>{
      console.log("Attempting to populate database with user types...");
      const populated = await isPopulated();
      if(!populated){
            console.log("Populating database with user types...");
            for(let type in userTypes){
                  const newType = new UserType({
                        accessRights: type
                  });
                  await newType.save();
            }
            console.log("Database populated with user types.");
      }else{
            console.log("Database already populated with user types. - Skipping.");
      }

}