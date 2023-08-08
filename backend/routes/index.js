const router = require('express').Router()

const TaskControllerController = require('../app/controllers/taskController')

router.post('/api/add', TaskControllerController.add);
router.get('/api/get', TaskControllerController.get);
router.put('/api/update/:id', TaskControllerController.update);
router.delete('/api/delete/:id', TaskControllerController.delete);

module.exports = router