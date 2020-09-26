const express = require('express');
const app= express();
const path = require('path');

//Import Routes
const apiRouter =require('./routes/');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/products');

//Middlewares
app.use(express.json());


// Serve static files from the React frontend app
//app.use(express.static(path.join(process.cwd(),'public')))
// Anything that doesn't match the above, send back index.html
//app.get('*', (req, res) => {
  //res.sendFile(path.join(process.cwd(),'/public/index.html'))
//})

//Routes Middleware
app.use('/api/products', apiRouter);
app.use('/', apiRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', apiRouter);
app.use('/api/SQLproduct', productRouter);


app.listen(process.env.PORT || 5000, () =>{

    console.log('Database Project Running...');
})