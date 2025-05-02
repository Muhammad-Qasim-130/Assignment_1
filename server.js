
const express = require('express');


const app = express();


const PORT = process.env.PORT || 3000; 


app.use(express.json());

let tasks = [

];
let nextTaskId = 1; 



app.get('/tasks', (req, res) => {
    console.log('GET /tasks requested');
    res.status(200).json(tasks); 
});


app.post('/addTask', (req, res) => {
    console.log('POST /addTask requested with body:', req.body);
    const { taskName } = req.body; 

  
    if (!taskName || taskName.trim() === '') {
        return res.status(400).json({ message: 'Task name cannot be empty' });
    }

  
    const newTask = {
        id: nextTaskId++, 
    };

   
    tasks.push(newTask);

    console.log('Task added:', newTask);
    res.status(201).json(newTask);
});


app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); 
    console.log(`DELETE /task/${taskId} requested`);

   
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
       
        const deletedTask = tasks.splice(taskIndex, 1); 
        console.log('Task deleted:', deletedTask[0]);
        res.status(200).json({ message: `Task with ID ${taskId} deleted successfully` }); 
    } else {
   
        console.log(`Task with ID ${taskId} not found for deletion.`);
        res.status(404).json({ message: `Task with ID ${taskId} not found` }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});