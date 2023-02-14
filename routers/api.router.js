const router = require("express").Router();
const todoRouter = require("./api/todo.router");
const userRouter = require("./api/user.router");
const productRouter = require("./api/product.router");
const cartRouter = require("./api/cart.router");

router.use("/todo", todoRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
