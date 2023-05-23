// creating router wia express and importing User Route and Task Manager Route
const express = require('express');
const router = express.Router();
const UserRoutes = require('./UserRoutes');
const TasksRoutes = require('./TaskRoutes');
// home router with page
router.get('/', (req ,res) => {
    return res.render('Home');
});

// router for user
router.use('/api/v1/user' , UserRoutes);
// router for tasks
router.use('/api/v1/tasks' , TasksRoutes);

// exporting for globle use
module.exports = router;