import { NextFunction } from "express";
import { Request, Response } from "express";
import validator from 'express-validator';
import {check, validationResult} from 'express-validator/check';
import User, { IUser } from "../models/User/User";
import UserType from "../models/UserType/UserType";
import accessRIGHTS from "../models/UserType/config";


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
                    message: 'invalid email or password'
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
            message: 'user already exists'
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

