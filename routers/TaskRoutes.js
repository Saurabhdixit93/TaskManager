// creating router wia express and importing User Controller and JWT
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskManagerController');
const JWT_Auth = require('../configration/JWT_Auth');

// creating route for new Task 
router.post('/create-new-task', JWT_Auth , TaskController.createNewTask);
// creating route for getting All tasks by userID
router.get('/get-tasks/:userId', JWT_Auth ,TaskController.GetAllTask);
// creating route for updating task by taskId
router.put('/update-task/:taskId', JWT_Auth ,TaskController.UpdateTask);
// creating route for deleting task by taskId
router.delete('/delete-task/:taskId', JWT_Auth ,TaskController.DeleteTask);

// exporting for globle use
module.exports = router;