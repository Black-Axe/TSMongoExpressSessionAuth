import { NextFunction } from "express";
import { Request, Response } from "express";
import {validationResult} from 'express-validator/check';
import User, { IUser } from "../models/User/User";
import UserType from "../models/UserType/UserType";
import accessRIGHTS from "../models/UserType/config";
import { verifyJWTToken } from "../services/resettoken.service";
import ResetToken, { IResetToken } from "../models/ResetToken/ResetToken";


export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    //make sure user exists
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: 'invalid email or password',
                    error: true
                });
        }

    });
    
}

export async function registerMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let potentialUser = await User.findOne({username: req.body.username});
    if(potentialUser) {
        return res.status(422).json({
            message: 'user already exists',
            error: true
        });
    }
        next();
}

export async function SUDOMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //çconsole.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    //check if user is admin
    //he should be logged in so we can get the user from the request
    const user = req.user as IUser;
    let isAdmin = false;
    if(user) {
        let userRoles = user.userAccess as string[]; //user.userAccess is an array of strings of mongoose object ids
        //check if any of these ids(which correspond to the type) match the admin role
        for(let roleId of userRoles) {
            let role = await UserType.findById(roleId);
            if(role.accessRights === accessRIGHTS.admin) {
                isAdmin = true;
            }
        }

    }
    if(!isAdmin) {
        return res.status(403).json({
            message: 'you are not authorized to perform this action'
        });
    }



    next();
}

export async function resetPassRequestMiddleWare(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //check if we got either a username or email and proceed accordingly
    let email = req.body.email;
    let username = req.body.username;
    //check if user exists in either case , handling email first if that is the case
    if(email) {
        let user = await User.findOne({email: email});
        if(!user) {
            return res.status(200).json({
                message: 'if the user exists, an email will be sent to them',
            });
        }
    }else if(username) {
        let user = await User.findOne({username: username});
        if(!user) {
            return res.status(200).json({
                message: 'if the user exists, an email will be sent to them',
            });
        }
    }

    next();
}

export async function resetPasswordMiddleware(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //get the token from the request
    let resetToken = req.body.resetToken;
    //check if the token is valid or expired
    let verified = verifyJWTToken(resetToken);
    if(verified.error){
        return res.status(422).json({
            message: 'invalid or expired token',
            error: true
        });
    }
    //check if the token exists in the database
    let verifiedResetToken = await ResetToken.findOne({resetToken: resetToken}) as IResetToken;
    if(!verifiedResetToken) {
        return res.status(422).json({
            message: 'invalid token',
            error: true
        });
    }


    //can add any other checks here if needed such as 
    //checking if the user exists in the database
    //checking the ip address of the user who requested the reset
    //checking the region etc, can also check and add previous passwords
    //to the user model if needed and prevent the user from using the same password
    //here would be a good check for that if implementing

    let userID = verifiedResetToken.user;
    req.body.user = userID;

    next();
    

}

export async function rememberMe(req: Request, res: Response, next: NextFunction){
    if(req.body.remember){
        console.log('remember me');
        console.log(req.body.remember);
        var oneWeek = 7 * 24 * 60 * 60 * 1000;
        req.session.cookie.expires = new Date(Date.now() + oneWeek);
        req.session.cookie.maxAge = oneWeek;
    }
    next();
}