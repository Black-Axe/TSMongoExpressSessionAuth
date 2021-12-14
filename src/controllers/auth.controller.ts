import {adminRegistersUser} from '../services/auth.service';
import {Request, Response, NextFunction} from 'express';

export async function SUDO_REGISTER(req:Request, res:Response, next:NextFunction) {
    const {username, password, email, accessLevels} = req.body;
    let user;
    if(!accessLevels){user = await adminRegistersUser({username, password, email});}
    else{user = await adminRegistersUser({username, password, email, accessLevels});}
    res.status(200).send(user);
}

export async function regularRegister(req:Request, res:Response, next:NextFunction) {
    const {username, password, email} = req.body;
    let user = await adminRegistersUser({username, password, email});
    console.log(user + "as registereted returned from regular register");
    res.status(200).send(user);
}