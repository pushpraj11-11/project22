const Genre = require('../models/genre.model');

const findAllgenre = (req,res)=>{
    Genre.find()
    .then(genre=>{
        res.json(genre)
    })
    .catch(err=>{
        console.log(err)
        res.status(401).send('error')
    })
}

module.exports = findAllgenre;
 