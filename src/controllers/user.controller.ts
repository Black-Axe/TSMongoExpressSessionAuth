import {adminRegistersUser} from '../services/auth.service';
import {Request, Response, NextFunction} from 'express';


export async function userProfile(req:Request, res:Response, next:NextFunction) {
    //get id from req.sessionID
    res.status(200).send({
        message: "welcome to your profile",
        user: req.user,
        session: req.sessionID
    });

}
