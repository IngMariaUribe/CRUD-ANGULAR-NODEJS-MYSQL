const {Router }=require('express');
const pool =require('../database');
const providerCtrl=require("../controllers/providers.controller.js");
const router=Router();

router.get('/read',providerCtrl.getProviders);
router.get('/read/:id',providerCtrl.getProvider);
router.post('/create',providerCtrl.createProviders);
router.delete('/delete/:id',providerCtrl.deleteProvider);
router.put('/update/:id',providerCtrl.updateProvider); 

module.exports = router;