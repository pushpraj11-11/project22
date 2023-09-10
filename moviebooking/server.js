// const http = require('http');

// const server = http.createServer((req,res)=>{
//   const method = req.method;
// const url =  req.url;
// if(method === 'GET' && url =='/movies' ){
//   res.writeHead(200,{'Content-Type': 'application/json'})
//   res.end(JSON.stringify({message:'All Movies Data in JSON format from Mongo DB'}))
// }
// else if(method === 'GET' && url === '/genres'){
//   res.writeHead(200 , {'Content-Type' : 'application/json'});
//   res.end(JSON.stringify({message : 'All Genres Data in JSON format from Mongo DB'}))
// }
// else if(method === 'GET' && url === '/artists'){
// res.writeHead(200,{'Content-Type': 'application/json'});
// res.end(JSON.stringify({"message" : 'All Artists Data in JSON format from Mongo DB'}))
// }
  
// })

// server.listen(9000, () => {
//   console.log(`Server is running on port 9000`);
// });


// module.exports = server;  

// //
// //Checkpoint 6 part1
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 1000;


// app.use(cors());


// app.get('/',(req,res)=>{
//     res.json({message: "Welcome to Movie booking app"});
// });


// app.listen(PORT, ()=>{
//     console.log('serveris running on port');
// })

// //

// const db = require("./app/models");
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
    
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   }); 


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // If you need to parse JSON request bodies
const app = express();
const dbConnection = require('./config/db.config')
const cors = require('cors')
// Import your routes
const movieRoutes = require('./routes/movie.route');
const artistRoutes = require('./routes/artist.route');
const genreRouter  = require('./routes/genre.route')
const userRoutes = require('./routes/user.route')

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });
app.use(cors)

// app.get('/',(req,res)=>{
//     res.json({message: "Welcome to Movie booking app"});
// });



app.get('/movies',(req,res)=>{
  res.json({message:'All Movies Data in JSON format from Mongo DB'})
})


// app.get('/genres',(req,res)=>{
//   res.json({message:'All Genres Data in JSON format from Mongo DB'})
// })

// app.get('/artists',(req,res)=>{
//   res.json({message:'All Artists Data in JSON format from Mongo DB'})
// })


app.use(bodyParser.json());

// Use your routes
// app.use('/api/movies', movieRoutes);
// app.get('/',findAllArtists)
app.use(artistRoutes);
app.use(genreRouter);
app.use(movieRoutes)
app.use(userRoutes)

app.listen(8085,()=>{
  console.log('3000')
}) 