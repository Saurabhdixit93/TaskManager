// importing TaskManager model
const TaskModel = require('../models/TaskManager');


// Create Task Function
module.exports.createNewTask = async (req ,res) => {
    try{
        // Extract All task details from request body  
        const { title , description , dueDate , status } = req.body;
        // Create a new task object with the provided Data
        const newTask = await new TaskModel({
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
        });
        // Save the new Task to the DataBase
        const savedTask = await newTask.save();
        return res.status(201).json({
            message: 'New Task Created SuccessFully',
            task: savedTask,
        });
    }catch(error){
        return res.status(500).json({
            message: `Error in Creating New Task : ${error.message}`
        });
    };
};

// Get All Task function

module.exports.GetAllTask = async (req ,res) => {
    try{

        // Extract the userId from the request parameters
        const { userId } = req.params;

        // find all task with a matching user ID
        const allTasks = await TaskModel.find({ user: userId });
        // check if matching or not
        if(!allTasks){
            return res.status(404).json({
                message: 'User Is not Associated with that Tasks'
            });
        };
        // if matching then send success message with all tasks
        return res.status(200).json({
            message: 'Tasks Retrived Successfully',
            task: allTasks
        });
    }catch(error){
        return res.status(500).json({
            message: `Error in Getting ALl Tasks : ${error.message}`
        });
    };
};


// Updating Task Wia Id
module.exports.UpdateTask = async (req ,res) => {
    try{
        
        // Extract the taskId from the request parameters
        const { taskId } = req.params;
        // Getting new Data From req Body
        const updates = req.body;

        // find the task by ID and Update new specified fields
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates ,{new: true});
        // check if Task available or not
        if(!updatedTask){
            return res.status(404).json({
                message: 'Task Not found'
            });
        };
        // available then send 
        return res.status(200).json({
            message: 'Task Updated Successfully',
            task: updatedTask
        });
    }catch(error){
        return res.status(500).json({
            message: `Error in Creating New Task : ${error.message}`
        });
    };
};

// delete Task Function

module.exports.DeleteTask = async (req ,res) => {
    try{

        // Extract the taskId from the request parameters
        const { taskId } = req.params;

        // find the task by ID and Delete it
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        // check If task Available or not 
        if(!deletedTask) {
            return res.status(404).json({
                message: 'Task Not Found'
            });
        };
        // if task found then send message
        return res.status(200).json({
            message: 'Task Deleted Successfully',
            task: deletedTask,
        });
    }catch(error){
        return res.status(500).json({
            message: `Error in Deleting Task : ${error.message}`
        });
    };
};
