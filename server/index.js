//Framework for routing
import express from 'express';
//Allows us to send post requests
import bodyParser from 'body-parser';
//Create models
import mongoose from 'mongoose';
//Enable cross-origin requests
import cors from 'cors';

//Import routes
import postRoutes from './routes/posts.js';

//Initialize express
const app = express();

//Set up bodyParser and cors to properly send requests
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//Connect router: starting path + extensions
app.use('/posts', postRoutes);

//Connect to MongoDB cloud atlas database
const CONNECTION_URL = 'mongodb+srv://diedman123:Diedman123@cluster0.orl21iy.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));