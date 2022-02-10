const {Router }=require('express');
const pool =require('../database');
const productCtrl=require("../controllers/products.controller.js");


const router=Router();

router.get('/read',productCtrl.getProduct);
router.get('/consult/:id',productCtrl.consultProduct);
router.post('/create',productCtrl.createProduct);
router.delete('/delete/:id',productCtrl.deleteProduct);
router.put('/update/:id',productCtrl.updateProduct);


module.exports = router;