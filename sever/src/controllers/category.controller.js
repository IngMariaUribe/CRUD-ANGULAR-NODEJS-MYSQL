
const pool =require('../database');
const itemCtrl={};
//category and sub
itemCtrl.getItem=async(req,res)=>{
    await pool.query('SELECT *FROM item',(err,rows)=>{
        res.json(rows);
    });
};   

module.exports=itemCtrl;
