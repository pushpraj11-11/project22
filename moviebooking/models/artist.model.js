
const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artistid :{
        type: Number,
        required :true
    },
    first_name : {
        type: String,
        required : true
    },
    last_name:{
        type:String,
        required: true 
    },
    wiki_url :{
        type:String,
        required: true
    },
profile_url :{
    type:String,
    required:true
},
movies :{
    type:[String],
    default :[]
}
});

const Artist = mongoose.model('Artist' , artistSchema);

module.exports = Artist;