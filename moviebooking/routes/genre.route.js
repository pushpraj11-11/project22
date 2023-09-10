const express = require('express')
const  router = express.Router()


const findAllgenre = require('../controllers/genre.controller')

router.get('/genres',findAllgenre)

module.exports = router
