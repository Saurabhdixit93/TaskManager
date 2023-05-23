const mongoose = require('mongoose');

module.exports.ConnectDB = async () => {
    try 
    {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          
        });
        console.log(`MongoDB Database connected in : ${conn.connection.host} , Successfully`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};