const Proyects = require('../models/Proyect');

const newProyect = async (req, res) => {
    const proyects = await Proyects.findAll({
        where: {
            userId: req.user.id
        }
    })
    
    res.render('newProyect', {
        title: 'New Proyect',
        proyects
    })
}

const saveProyect = async (req, res) => {
    const { name } = req.body;

    await Proyects.create({
        name,
        userId: req.user.id
    });
    
    res.redirect('/');
}

const updateProyect = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    await Proyects.update({name}, {where: {id}});
    res.redirect('/'); 
}

module.exports = {
    newProyect,
    saveProyect,
    updateProyect
}