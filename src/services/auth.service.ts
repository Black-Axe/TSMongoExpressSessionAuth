import User, {IUser}from "../models/User/User";
import bcrypt from "bcryptjs";
import userTypeConfig from "../models/UserType/config";
import UserType from "../models/UserType/UserType";

//return of the function
interface IReturnRegister{
    user: IUser;
    error: boolean;
    message: string;
}

//this will be used to create a new user by the admin
//we include the access levels for the function that the admin will assign for the user
//there will be another function that a regular user will use to register 
//where they will be assigned the access level of the user
export const adminRegistersUser = 
//middlewares will check for admin access level
    async ({email, password, username,accessLevels }:{email:string,password:string,username:string, accessLevels?:string[]}):Promise<IReturnRegister> =>{
        let newUsersAccessLevels = [];
        //check if the user already exists
        console.log("properties provided for registration", email, password, username, accessLevels);

        //check if user exists by email or username
        const user = await User.findOne({$or:[{email:email},{username:username}]});
        if(user){return{
            message: "User already exists",
            error: true,
            user: null
        }}


        //accessLevels will be an array of strings
        //we will convert the strings to the access level object  
        if(!accessLevels || accessLevels.length === 0){ 
            console.log("no access levels provided");
            //if the accessLevels is not provided we will assign the user to the default access level
            let defaultAccessLevel = await UserType.findOne({accessRights: userTypeConfig.user});
            newUsersAccessLevels.push(defaultAccessLevel._id);
        }else{
            //if the accessLevels is provided we will convert the strings to the access level object
            for(let accessRight of accessLevels){
                console.log(accessRight + "access right sent in");
                let accessLevel = await UserType.findOne({accessRights: accessRight});
                console.log("access level found is " + accessLevel);
                newUsersAccessLevels.push(accessLevel._id);
                console.log("access level pushed to array where array is " + newUsersAccessLevels);
            }
        }

        //mongoose-local-passport will hash the password and handle it when we register the user

        //create a new user
        const newUser = new User({
            email,
            username,
            userAccess: newUsersAccessLevels
        });



        //register the user
        let registeredUser = await User.register(newUser, password);
        console.log("user registered" + registeredUser);
        if(registeredUser){
            return{
                message: "User registered",
                error: false,
                user: registeredUser
            }
        }else{
            return{
                message: "error registering user",
                error: true,
                user: null
            }
        }
    


        


};