import express from "express";
import accesslevels from "../models/UserType/config";
import UserType from "../models/UserType/UserType";

const router = express.Router();

router.get("/dev/types", (req, res) => {
    console.log(req.body);
    res.send(accesslevels);

})

router.get("/dev/type", async (req, res) => {
    console.log(req.body);
    let defaultAccessLevel = await UserType.findOne({accessRights: accesslevels.user});
    console.log(defaultAccessLevel);
    res.send(defaultAccessLevel);

})



export default router;