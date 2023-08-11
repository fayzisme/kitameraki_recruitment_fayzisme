const { errorHandler } = require('../../utils')


let tasks = [];

// data dummy
for (let index = 0; index < 20; index++) {
    tasks.push({
        id: index + 1,
        title: 'Dummy',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium doloribus earum eius quisquam quaerat ad eos quod. Voluptas impedit omnis adipisci? Quis enim quos maxime ipsam. Repellendus optio, aperiam pariatur explicabo nesciunt dicta eius iusto. Quisquam earum, quas maxime obcaecati qui minus consectetur eum repudiandae magnam alias iste explicabo totam!',
        done: false
    })
}

let column = [
    { key: 'no', name: 'No', fieldName: 'id', minWidth: 30, maxWidth: 30},
    { key: 'title', name: 'Task', fieldName: 'title', minWidth: 100, maxWidth: 100},
    { key: 'description', name: 'Description', fieldName: 'description', minWidth: 100, maxWidth: 600}
]

class TaskController {
    async add (req, res) {
        try {
            // Get user from database based on user input
            const {title, description} = req.body
            
            // If user not found, return 403 error
            if(!title){
                return res.status(400).json({message: 'Title not found'})
            }

            let newTask = req.body;

            newTask.id = tasks.length + 1;
            newTask.done = false

            // let newTask = {
            //     id: tasks.length + 1,
            //     title: title,
            //     description: description,
            //     done: false
            // }

            tasks.push(newTask);

            res.status(201).json({task: newTask, message: 'Success' })
        } catch (error) {
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async get(req, res) {
        try {
            
            let newTask = tasks
            let newColumn = [...column]
            let otherColumn = []

            if (req.query && req.query.title) {
                newTask = tasks.filter(i => i.title.toLowerCase().indexOf(req.query.title) > -1)
                
            }
            
            newTask.forEach(element => {
                // console.log(element);
                if (element.date) {
                    const inputDate = new Date(element.date);
                    const day = inputDate.getUTCDate();
                    const month = inputDate.getUTCMonth() + 1; // Bulan dimulai dari 0
                    const year = inputDate.getUTCFullYear();
                    const formattedDate = `${month}/${day}/${year}`;
                    element.date =  formattedDate   
                }

                if (Object.keys(element).length > 4) {
                    for (const [key, value] of Object.entries(element)) {
                        if(key == 'date') otherColumn.push({ key: 'date1', name: 'Date', fieldName: 'date', minWidth: 100, maxWidth: 100})
                        if(key == 'text') otherColumn.push({ key: 'text1', name: 'Text', fieldName: 'text', minWidth: 100, maxWidth: 200})
                        if(key == 'number') otherColumn.push({ key: 'number1', name: 'Number', fieldName: 'number', minWidth: 100, maxWidth: 100 })
                      }
                }
            });
            
            otherColumn.push({
                key: 'action',
                name: 'Action',
                fieldName: 'action',
                maxWidth: 280
            })

            res.json({tasks:newTask, column: [...newColumn, ...otherColumn]});
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