import express from "express";
import cookieSession from "cookie-session";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
    req.session = null;
    res.send({});
});

export { router as signoutRouter }