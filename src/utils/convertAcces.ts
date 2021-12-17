import UserType from "../models/UserType/UserType";
import { IUser } from '../models/User/User';

async function convertAccess(access:string[]){
      let stringedAccess = [];
      for(let i=0; i<access.length; i++){
          let accessId = access[i];
         // console.log("accessId: ", accessId);
          //find the access type from the mongoid
          let accessType = await UserType.findById(accessId);
        // console.log("accessType: ", accessType);
          if(accessType){
              stringedAccess.push(accessType.accessRights);
          }
  
      }
    //  console.log("stringedAccess: ", stringedAccess);
      return stringedAccess;
  }

  export default convertAccess;