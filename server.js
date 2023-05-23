// requiring All packages and files
const express =     require('express');
const mongoose =    require('mongoose');
const dotenv =      require('dotenv');
dotenv.config();
const PORT =        3500;
const app =         express();
const DATABASE =    require('./configration/Database_Config');
const bodyParser =  require('body-parser');
const jwt =         require('jsonwebtoken');
const jwtLogin =    require('./configration/JWT_Auth');


// for json format
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// views for homepage
app.set('view engine','ejs');
app.set('views','views');
// some specific error handeling
 
app.use((err, req, res, next) => {
    // Mongoose error handling
    if (err.name === 'MongoError' || err.name === 'MongoNetworkError' || err.name === 'MongoServerSelectionError' || err.name === 'connect ETIMEDOUT' ) {
      // Handle Mongoose errors 
      return res.status(400).json({
        message: 'Internal Server Error, Please Try After Some Time'
      });
    } else if(err.name === 'Error' || err.name === 'getaddrinfo') {
        return res.status(400).json({
            message: 'Internal Server Error, Please Try After Some Time'
        });
    }else {
      // Pass the error to the next middleware in the stack
      next(err);
    };
});

// routers for project
app.use('/',require('./routers'));
app.use('*' ,(req ,res) => {
    return res.status(404).json({
        message: '404 Page Not Found ,Try With Valid Routes'
    });
});


// Database Connect Before Server Start

DATABASE.ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Is connected Successfully in Port : ${PORT}`);
    });
});