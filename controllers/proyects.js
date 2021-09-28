const { response } = require('express');
const Proyects = require('../models/Proyect');
const Tasks = require('../models/Tasks');

const proyectByUrl = async (req, res, next) => {
    const { url } = req.params;
    
    const [proyects, proyect] = await Promise.all([
        Proyects.findAll({
            where: {
                userId: req.user.id
            }
        }),
        Proyects.findOne({
            where: { 
                url 
            }
        })
    ]);

    // Consult tareas proyecto actual
    const tasks = await Tasks.findAll({
        where: {
            proyectId: proyect.id,
        },
        // includes: [
        //     {
        //         model: Proyects
        //     }
        // ]
    })

    if(!proyect || !tasks) return next();

    res.render('tasks', {
        title: `Tareas del Proyecto - ${proyect.name}`,
        proyect, proyects, tasks
    })
}

const proyectEdit = async (req, res) => {
    const { id } = req.params;
    const [proyects, proyect] = await Promise.all([
        Proyects.findAll({
            where: {
                userId: req.user.id
            }
        }),
        Proyects.findOne({
            where: { id }
        })
    ]);

    res.render('newProyect', {
        title: `Editar Proyecto - ${proyect.name}`,
        proyect, proyects
    })
}

const proyetDelete = async (req, res, next) => {
    const { urlProyect } = req.query;
    const proyect = await Proyects.destroy({
        where: { url: urlProyect }
    })
    if(!proyect) return next();
    
    res.json({
        title: 'Proyecto Eliminado!',
        subtitle: 'El proyecto se ha eliminado',
        type: 'success'
    })
}

module.exports = {
    proyectByUrl, proyectEdit, proyetDelete
}