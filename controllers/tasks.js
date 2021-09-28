const Proyects = require('../models/Proyect');
const Tasks = require('../models/Tasks');

const createTask = async (req, res, next) => {
    const { url } = req.params;
    const { tarea } = req.body;
    // Obtener el proyecto
    const proyect = await Proyects.findOne({ 
        where: { 
            url 
        }
    });

    const task = await Tasks.create({
        task: tarea,
        status: 0,
        proyectId: proyect.id
    })

    if(!task) return next();

    res.redirect(`/proyects/${url}`);
}

const updateTaskStatus = async (req, res, next) => {
    const { id } = req.params;
    const task = await Tasks.findOne({ 
        where: {
            id 
        } 
    });

    let status = 0;
    if(task.status === status) status = 1;
    task.status = status

    const result = await task.save();
    if(!result) return next();

    res.status(200).send('Actualizado');
}

const deleteTasks = async (req, res, next) => {
    const { taskId } = req.query;
    const result = await Tasks.destroy({
        where: {
            id: taskId
        }
    });

    if(!result) return next();
    res.status(200).send('Tarea eliminada correctamente !');
}

module.exports = {
    createTask,
    updateTaskStatus,
    deleteTasks
}