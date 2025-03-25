const Ruoter = require('express')
const TaskController = require('../Controller/TaskController')
const middelWars = require('../MiddleWars/MiddleWars.Task')
const ruoter = Ruoter()

ruoter.post('/addTask', middelWars, TaskController.createTask)
ruoter.get('/getAllTasks', middelWars, TaskController.getAllTasks)
ruoter.get('/getOnseTask/:id', middelWars, TaskController.getOneTask)
ruoter.put('/updateTask/:id', middelWars, TaskController.updateTask)
ruoter.delete('/deleteTask/:id', middelWars, TaskController.deleteTask)

module.exports = ruoter