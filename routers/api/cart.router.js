const router = require('express').Router();
const cartController = require("../../controllers/api/cart.controller");


router.get('/view', cartController.cart);
// router.post('/add', cartController.add);
// router.get('/delete/:id?', cartController.deleteFromCart);




module.exports = router;