const { errorHandler } = require('../../utils')

let tasks = [];

class TaskController {
    async add (req, res) {
        try {
            // Get user from database based on user input
            const {title, description} = req.body
            
            // If user not found, return 403 error
            if(!title){
                return res.status(400).json({message: 'Title not found'})
            }

            let newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                done: false
            }

            tasks.push(newTask);

            res.status(201).json({task: newTask, message: 'Success' })
        } catch (error) {
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async get(req, res) {
        try {
            if (req.query && req.query.title) {
                res.json({tasks: tasks.filter(i => i.title.toLowerCase().indexOf(req.query.title) > -1)});
            }
            else {
                res.json({tasks: tasks});
            }
            
        } catch (error) {
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async update (req, res) {
        const taskId = parseInt(req.params.id);
        const updatedTask = req.body;

        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    };

    async delete (req, res) {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const deletedTask = tasks.splice(taskIndex, 1);
            tasks = tasks.map((el,i) => {
                el.id = i + 1
                return el
            })
            res.json(deletedTask[0]);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    };
}

module.exports = new TaskController