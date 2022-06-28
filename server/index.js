//Framework for routing
import express from 'express';
//Allows us to send post requests
import bodyParser from 'body-parser';
//Create models
import mongoose from 'mongoose';
//Enable cross-origin requests
import cors from 'cors';
//Import environmental variables
import dotenv from 'dotenv';

//Import routes
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//Initialize express
const app = express();
//Configure .env file
dotenv.config();

//Set up bodyParser and cors to properly send requests
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//Connect router: starting path + extensions
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req,res) => {
    res.send('APP IS RUNNING.');
});

//Connect to MongoDB cloud atlas database
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));