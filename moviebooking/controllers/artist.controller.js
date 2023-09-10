const  Artist = require('../models/artist.model')

const findAllArtists = (req, res) => {
    Artist.find()
      .then(artists => {
        res.json(artists);
      })
      .catch(err => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };

module.exports = findAllArtists
 
    