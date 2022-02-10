const express=require('express');
const connect = require('express-myConnection');
const mysql= require('mysql');
const morgan=require('morgan');
const cors=require('cors');

const app=express();
app.set('port', process.env.PORT ||4000);

//midlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin: "http://localhost:4200"}));

//routes
app.use("/products",require('./routes/products.routes'));
app.use("/providers",require('./routes/providers.routes'));
app.use("/category",require('./routes/category.routes'));


module.exports = app;