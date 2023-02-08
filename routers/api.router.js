const router = require("express").Router();
const todoRouter = require("./api/todo.router");
const userRouter = require("./api/user.router");

router.use("/todo", todoRouter);
router.use("/user", userRouter);

module.exports = router;
