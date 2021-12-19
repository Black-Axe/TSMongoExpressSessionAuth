import {adminRegistersUser} from '../services/auth.service';
import {Request, Response, NextFunction} from 'express';
import convertAccess from '../utils/convertAcces';
import {createResetToken, verifyJWTToken} from '../services/resettoken.service';
import {sendResetLink} from '../services/email.service';
import User from '../models/User/User';
import ResetToken from '../models/ResetToken/ResetToken';

export async function SUDO_REGISTER(req:Request, res:Response, next:NextFunction) {
    const {username, password, email, accessLevels} = req.body;
    let user;
    if(!accessLevels){user = await adminRegistersUser({username, password, email});}
    else{user = await adminRegistersUser({username, password, email, accessLevels});}
    res.status(200).send(user);
}

export async function regularRegister(req:Request, res:Response, next:NextFunction) {
    const {username, password, email} = req.body;
    console.log("received request to register user: ", username, password, email);
    let registered = await adminRegistersUser({username, password, email});
    //login the user
    if(registered.error){
        res.status(400).send(registered);
    }else{
        let returnUser = registered.user;

            // need to login the user as well
            req.login(returnUser, async(err) => {
                if(err){
                    res.status(400).send(err);
                }else{
                    let accessConverted = await convertAccess(returnUser.userAccess);
                    console.log("access converted is " + accessConverted);
                    res.status(200).send({
                        message: "User registered successfully",
                        verified: true,
                        user:{
                            username: returnUser.username,
                            email: returnUser.email,
                            accessLevels: accessConverted,
                        }
                    });
                }
            });
    };                   
}


export async function resetPassword(req:Request, res:Response, next:NextFunction) {
    const {email, username} = req.body;
    //if the user supplied an email
    console.log("received request to reset password for user: ", email);
    //generate new reset token and send email
    if(email){
        let resetToken = await createResetToken({email: email});
        if(resetToken.error){
            res.status(400).send(resetToken);
        }else{
            sendResetLink({email: email, tokenString: resetToken.resetToken});
            res.status(200).send({
                message: "if the user exists, an email will be sent to them"
            });
        }

    }else if(username){
        //if the user supplied a username
        let resetToken = await createResetToken({username: username});
        //find the users email
        let user = await User.findOne({username: username});
        let usersEmail = user.email;

        

        if(resetToken.error){
            res.status(400).send(resetToken);
        }else{
            sendResetLink({email: usersEmail, tokenString: resetToken.resetToken});
            res.status(200).send({
                message: "if the user exists, an email will be sent to them"
            });
        }

}
}

export async function verifyResetToken(req:Request, res:Response, next:NextFunction) {
    const {resetToken} = req.params;
    console.log("received request to verify reset token: ", resetToken);
    let verified = verifyJWTToken(resetToken);
    if(verified.error){
        return res.status(400).send({
            error: true,
            message: "invalid token or token expired"
        });
    }

    let verifiedResetToken = await ResetToken.findOne({resetToken: resetToken});
    
    if(verifiedResetToken){
       return res.status(200).send({
            verified: true,
            message: "token verified",
            user: verifiedResetToken.user
        });
    }else{
       return res.status(400).send({
            verified: false,
            message: "invalid token or token expired",
            error: true
        });

    }

    

    
}