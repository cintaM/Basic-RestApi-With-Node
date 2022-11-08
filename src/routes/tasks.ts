import { Router } from 'express';
import { taskController } from '../controller/tasks';

const taskRouter = Router();

taskRouter.post('/post', taskController.addTask);
taskRouter.get('/get-all', taskController.getAllTasks);
taskRouter.get('/get/:id', taskController.getTask);
taskRouter.delete('/delete/:id', taskController.deleteTask);
taskRouter.put('/update/:id', taskController.updateTask);


export{ taskRouter};