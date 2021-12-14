import passport from 'passport';
import express from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User/User';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from "../../config/defaults";
import flash from 'connect-flash';
let uri = config.mongoURI;


export default function initPassportAndSessions(app: express.Application) {

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    name: "sessionName",
    store: MongoStore.create({
        mongoUrl: uri,
    })

}));


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

console.log("passport and sessions loaded")
}