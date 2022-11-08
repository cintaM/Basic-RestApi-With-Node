import { queryDb, queryFirst } from "../service/db"

export type Task = {
    id: number,
    title: string,
    description: string
}

const addTask = async (task: Task) => {
    await queryDb(`INSERT INTO task (title, description) VALUES(?, ?)`, [task.title, task.description]);
   const devolver= await queryDb(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'task'`);
    return getTask(devolver[0].Id);
}

const updateTask = async (task: Task) => {
    await queryDb(`UPDATE task SET title = ?, description = ? WHERE id = ?`, [task.title, task.description, task.id]);
    return getTask(task.id);
}

const getAllTasks = async () => {
    const devolver= await queryDb(`SELECT * FROM task`);
    return devolver as Task[];
}

const getTask = async (id: number) => {
    const devolver= await queryFirst(`SELECT * FROM task WHERE id = ?`, [id]);
    return devolver as Task[];
}

const deleteTask = async (id: number) => {
 await queryFirst(`DELETE FROM task WHERE id = ?`, [id]);
}

export const taskModel = {
    addTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask
}