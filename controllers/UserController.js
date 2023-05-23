// requiring all files and packages
const { secretKey , expiresIn } = require('../configration/JWT_Config');
const bcryptJs =                  require('bcryptjs');
const jwt =                       require('jsonwebtoken');
const UserModel =                 require('../models/User');

// User Account Create function 
module.exports.createNewAccount = async (req, res) => {
  try {
    // getting all inputs from body wia `req`
    const { name, password, email } = req.body;

    // Define regex to validate email format
    const emailRegex = /^([a-zA-z0-9._-]+)@(gmail|yahoo|hotmail|zohomail|hcl|live|outlook)\.(com)$/;

    // Checking if the email matches the specified regex pattern
    if (emailRegex.test(email)) { 
      const lowerCaseEmail = email.toLowerCase();
       // Checking if a user with the provided email already exists
      const existingUser = await UserModel.findOne({ email: lowerCaseEmail });
      if (existingUser) {
        // Return a 409 status (Conflict) if the user already exists
        return res.status(409).json({ 
          message: 'User Already Exists With This Email.'
        });
      } else {
        // If user doesn't exist, hash the password and create a new user
        const hashedPassword = await bcryptJs.hash(password, 15); 
        const newUser = new UserModel({
          name,
          email:    lowerCaseEmail,
          password: hashedPassword,
        });
        // Saving the new user to the database
        const savedUser = await newUser.save(); 
        // Return a 201 status (Created) for a new user
        return res.status(201).json({ 
          message: 'New Account Created Successfully',
          savedUser,
        });
      }
    } else {
      // Return a 400 status (Bad Request) if the email is not valid
      return res.status(400).json({
        message: 'Enter Valid Email Address.' 
      });
    }
  } catch (err) {
    // Logging any errors that occur during the process
    console.log('Error In register', err); 
    // Return a 500 status (Internal Server Error) if an error occurs
    return res.status(500).json({
      message: `Error In Register: ${err.message}` 
    });
  };
};

// User Login Function
module.exports.UserLogin = async (req, res) => {
    try
    {

      // Extract email and password from request body  
      const { email, password } = req.body; 
      // Convert email to lowercase for case-insensitive comparison
      const lowerCaseEmail = email.toLowerCase(); 
  
      // Check if the user exists
      const userExists = await UserModel.findOne({ email: lowerCaseEmail });
      if (!userExists) {
        return res.status(404).json({
          message: 'User Email Not Found or User Does Not Exist'
        });
      }
  
      // Verify the password
      const passwordMatch = await bcryptJs.compare(password, userExists.password);
      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Incorrect Password'
        });
      }
  
      // Create a token for authentication with expires Time
      const token = jwt.sign({ id: userExists._id }, secretKey, { expiresIn });
  
      return res.status(200).json({
        message: 'Login Successful',
        token: token,
        expiresIn:`${expiresIn} in sec`
      });
  
    } catch (err) {
      return res.status(500).json({
        message: 'Error in User Login'
      });
    };
};

// User Account Delete Function

module.exports.DeleteUserAccount = async (req ,res) => {
    try{
        // Extract the userId from the request parameters
        const { userId } = req.params;
        // find correct userId Associated with user's account
        const user = await UserModel.findByIdAndDelete({ _id:userId });
        // if user not exists with useId
        if(!user){
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        // deleted User from database
        return res.status(200).json({
            message: "User Deleted Successfull",
        });
    }catch(error){
        return res.status(500).json({
            message: `Error In Delete : ${error.message}`
        });
    };
};


// Update User Details Function 

module.exports.UpdateUser = async (req , res) => {
    try 
    {
        // Extract the userId from the request parameters
        const { userId } = req.params; 
        // Extract the updated fields from the request body
        const updates = req.body; 
        // Find the user by ID and update the specified fields
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
        // if user not exists with useId
        if (!updatedUser) {
          return res.status(404).json({
            message: 'User Not Found'
          });
        }
        // Update And Send New User Details
        return res.status(200).json({
          message: 'User Details Updated Successfully',
          user: updatedUser
        });
    
    }catch (err) {
        return res.status(500).json({
          message: 'Error in Updating User Details'
        });
    };
};