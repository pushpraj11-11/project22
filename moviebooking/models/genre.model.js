
const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    genreid: {
        type: Number,
        required:true
    },
    genre:{
        type: String,
        requried : true
    }
})

const Genre = mongoose.model('Genre' , GenreSchema);

module.exports = Genre;

