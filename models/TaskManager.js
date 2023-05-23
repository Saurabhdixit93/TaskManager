const mongoose = require('mongoose');

// Creating task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    dueDate: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['pending' , 'completed'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
},{timestamps:true});

// Add a pre-save hook to format the dueDate
taskSchema.pre('save', function (next) {
    const currentDate = new Date(this.dueDate);
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  
    this.dueDate = formattedDate;
    next();
});


// exporting to use in project

module.exports = mongoose.model('TaskManager', taskSchema);