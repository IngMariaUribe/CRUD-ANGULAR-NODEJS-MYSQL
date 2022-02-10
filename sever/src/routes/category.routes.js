const {Router }=require('express');
const pool =require('../database');
const itemCtrl=require("../controllers/category.controller.js");
const router=Router();


router.get('/read',itemCtrl.getItem);

module.exports = router;