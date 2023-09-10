const express = require('express')
const findAllArtists = require('../controllers/artist.controller')
const router  = express.Router()

router.get('/artists',findAllArtists)

  module.exports = router