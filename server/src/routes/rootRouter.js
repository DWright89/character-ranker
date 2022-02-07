import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import characterRouter from "./api/v1/characterRouter.js";
// import voteRouter from "./api/v1/voteRouter.js"
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/characters", characterRouter)
// rootRouter.use("/api/v1/votes", voteRouter)


export default rootRouter;
