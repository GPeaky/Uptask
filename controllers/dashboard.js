const Proyects = require('../models/Proyect');

const proyectHome = async (req, res) => {
    const proyects = await Proyects.findAll({
        where: {
            userId: req.user.id
        }
    });

    res.render('index', {
        title: 'Proyects',
        proyects
    })
}

module.exports = {
    proyectHome
}