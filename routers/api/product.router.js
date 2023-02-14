const router = require('express').Router();
const productController = require("../../controllers/api/product.controller");

router.get('/view', productController.list);
// router.get('/view/:id?', productController.add);
// router.get('/product/:id?', productController.inc);


// router.get('/product/:id?', productController.dec);


module.exports = router;