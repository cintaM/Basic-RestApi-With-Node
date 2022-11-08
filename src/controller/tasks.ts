import {Response, Request} from 'express';
import { Task, taskModel } from '../model/task';
import { badRequest, internalError, notFound, okNumber } from '../service/util';

const addTask = (req: Request, res: Response) => {
    {
        const task = req.body;
        if (!task.title){
            return badRequest(res, 'titulo no completado');
        }
        if (!task.description){
            return badRequest(res, 'descripción no completada');
        }
    }
    const task = req.body as Task;
    return taskModel.addTask(task)
    .then(task => {
        res.json(task)
    })
    .catch(err => internalError(res, err))
}

const updateTask = async ( req: Request, res: Response) => {
    const id = parseInt(req.params.id);   
     
    {
         if(!okNumber(id))
        return badRequest(res, 'id no válido');

        const task = req.body;
        if(!task){
            return badRequest(res, 'tarea no realizada');
        }
        if (!task.title){
            return badRequest(res, 'titulo no completado');
        }
        if (!task.description){
            return badRequest(res, 'descripción no completada');
        }

        const saveTask = await taskModel.getTask(id);
        if(!saveTask)
        return notFound(res, 'no encontrado');
    }
    const task = req.body as Task;
    return taskModel.updateTask(task)
    .then(task => {
        res.json(task)
    })
    .catch(err => internalError(res, err))
}
const getAllTasks = ({}: Request, res: Response) =>{
  return taskModel.getAllTasks()
    .then(tasks => {
        res.json(tasks)
    })
    .catch(err => internalError(res, err))
}

const getTask = (req: Request, res: Response) =>{
 const id = parseInt(req.params.id);   
    {   
        if(!okNumber(id))
        return badRequest(res, 'id no válido')
    }
   return taskModel.getTask(id)
    .then((task )=> {
        if(task){
             res.json(task)
        }
        else
        return notFound(res, 'tarea no encontrada')
    })
    .catch(err => internalError(res, err))
}

const deleteTask = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);   
       {   
           if(!okNumber(id))
           return badRequest(res, 'id no válido')

            const saveTask = await taskModel.getTask(id);
        if(!saveTask)
        return notFound(res, 'no encontrado');
       }
      return taskModel.getTask(id)
       .then(()=> {
          return res.sendStatus(200);
       })
       .catch(err => internalError(res, err))
   }

export const taskController =  {
    addTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask
}