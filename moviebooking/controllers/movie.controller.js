const express =require('express');
const  mongoose  = require('mongoose');
const app = express();
const Movies = require('../models/movie.model')

// mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
// useNewUrlParser:true,
// useUnifiedTopology:true
// }).then(() => { 
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });

//findAllMovies() - to search the movie by status.
const findAllMovies =(req,res)=>{
    const status =  req.query.status;
    console.log('Received request with status:', status);

    if(status==='PUBLISHED'){
        console.log('Querying for published movies...');
        Movies.find({published:true})
        .then(movies =>{
            console.log(movies)
            res.json(movies)
        })   
        .catch(err=>{
            console.log(err)
        })
    }
    else if(status === 'RELEASED'){
        console.log('Querying for released movies...');
        Movies.find({released:true})
        .then(movies=>{
            console.log(movies)
            res.json(movies)
        })
            .catch(err=>{
                console.log(err)                
                res.status(500)    
            })
        }
        else {
            res.status(400).json({ error: "Invalid status parameter" });
        }
    }
    

    //findOne() - to fetch all details of a movie given its id.

    const findOne =   (req,res)=>{
     const id = req.query.id
     console.log(id)
        if (!id) {
            return res.status(400).json({ error: 'Movie ID is required' });
          }
         Movies.findOne({movieid : id})
        .then(moviename=>{
            console.log(moviename)
            res.json(moviename)
        })
        .catch(err=>{
            console.log(err)
        })
    }

//GET /movies?status=RELEASED&title={title}
//&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}






const getMovies = async (req, res) => {
  try {
    // Parse query parameters
    const { status, title, genres, artists, start_date, end_date } = req.query;

    // Construct a query object to filter movies based on query parameters
    const query = {};

    if (status) {
      query.status = status;
    }

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive title search
    }

    if (genres) {
      query.genres = { $in: genres.split(',') };
    }

    if (artists) {
      query.artists = { $in: artists.split(',') };
    }

    if (start_date && end_date) {
      query.release_date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    }

    // Fetch movies based on the constructed query
    const movies = await Movie.find(query);

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



    //findShows() - to fetch details of shows of a specific movie given its id.

    const findShows = (req,res)=>{
        const id = req.query.id
        if(!id){
            return res.status(400).json({error : 'Movie ID is required'})
        }
        Movies.findOne({movieid : id})
        .then(moviename=>{
            if (!moviename) {
                return res.status(404).json({ error: 'Movie not found' });
              }
       
        const showavailables = moviename.shows.length > 0
        if(showavailables){
            res.json(moviename.shows)
        }
        else{
            res.json({message : 'Shows Not available'})
        } 
    })
    }
    

    module.exports = {
        findShows : findShows,
        findOne :findOne,
        findAllMovies : findAllMovies   ,
        getMovies : getMovies
    }