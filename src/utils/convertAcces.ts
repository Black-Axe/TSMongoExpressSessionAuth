import UserType from "../models/UserType/UserType";
import { IUser } from '../models/User/User';

async function convertAccess(access:string[]){
      let stringedAccess = [];
      for(let i=0; i<access.length; i++){
          let accessId = access[i];
          //find the access type from the mongoid
          let accessType = await UserType.findById(accessId);
          //console.log(accessType.accessRights);
          if(accessType){
              stringedAccess.push(accessType.accessRights);
          }
  
      }
      return stringedAccess;
  }

  export default convertAccess;