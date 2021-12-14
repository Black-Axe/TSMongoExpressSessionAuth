import express from "express";
import {userProfile} from '../controllers/user.controller';
import connectEnsureLogin from "connect-ensure-login";

const router = express.Router();

router.get("/loginerror", (req, res) => {
    res.status(418).send({
        message: "I'm a teapot",
        error:"You must be logged in to access this page"
    })

})

router.get("/error", (req, res) => {
    res.status(418).send({
        message: "I'm a teapot",
        error: req.flash("error")
    });
});

router.get("/unauthorized", (req, res) => {
    res.status(401).send({
        message: "Unauthorized",
    });
});

router.get("/404", (req, res) => {
    res.status(404).send({
        message: "Not Found",
    });
})

export default router;