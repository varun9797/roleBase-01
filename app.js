const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');



// Bring in the database object
const config = require('./config/database');
require('dotenv').config();

// Defining the PORT
const PORT = process.env.PORT || 5000;


mongoose.connect(
 process.env.MONGODB_CONNECTION_STRING, 
  {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
 }, 
 (err) =>  {
	if (err) throw err; 
	console.log("MongoDB connection established");
}
);


// Initialize the app
const app = express();


// Defining the Middleware
app.use(cors());

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser Middleware
app.use(bodyParser.json());

// Passport Middleware 
app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req, res) => {
    return res.json({
    	message: "This is node.js role based authentication system"
    });
});


// Bring  in the user routes
const users = require('./routes/users');
app.use('/api/users', users);


app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});