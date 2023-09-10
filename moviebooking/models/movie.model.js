const  mongoose = require('mongoose');

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


const showsSchema = new mongoose.Schema([{
    id:{
        type: Number,
        required : true
    },
    theatre : {
        name:{
            type:String,
            required: true
        },
        city :{
            type:String,
            required:true,
        }
    },
    language:{
        type:String,
        required : true
    },
    show_timing :{
        type:Date,
        required: true
    },
    available_seats :{
        type:String,
        required:true
    },
    unit_price:{
        type: Number,
        required: true
    }
}])

    const movieSchema = new mongoose.Schema({

        "movieid": {
        type: Number,
        required:true
        },
        "title" : {
            type: String,
            required:true
            },
        "published" :{
            type: Boolean,
            required:true
            },
        "released" : {
            type: Boolean,
            required:true
            },
        "poster_url" : {
            type: String,
            required:true
            },
        "release_date" :{
            type: String,
            required:true
            },
        "publish_date" :{
            type: String,
            required:true
            },
        "artists" :[artistSchema], 
        "genres" :[GenreSchema],
        "duration":{
            type: Number,
            required:true
            },
        "critic_rating" :{
            type: Number,
            required:true
            },
        "trailer_url" : {
            type: String,
            required:true
            },
        "wiki_url":{
            type: String,
            required:true
            },
        "story_line":{
            type: String,
            required:true
            },
        "shows":[showsSchema]  
    })

    const Movie = mongoose.model('Movie', movieSchema);

    module.exports = Movie;