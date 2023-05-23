// creating router wia express and importing User Controller and JWT
const express = require('express');
const router = express.Router();
const UsertController = require('../controllers/UserController');
const JWT_Auth = require('../configration/JWT_Auth');

// Creating route for create a new user account.
router.post('/create-account' ,           UsertController.createNewAccount);
// Creating route for login an existing user.
router.post('/login-account' ,            UsertController.UserLogin);
// Creating route for update an existing user's account information.
router.put('/update-account/:userId' ,    JWT_Auth , UsertController.UpdateUser);
// Creating route for delete an existing user's account.
router.delete('/delete-account/:userId' , JWT_Auth ,UsertController.DeleteUserAccount);

// exporting for globle use
module.exports = router;