import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    try{
        //Retrieve all the posts in the database
        const postMessages = await PostMessage.find();
        //return the posts
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req,res) => {
    //get post info from request (frontend forms)
    const post = req.body;
    //Create new model using info from the forms
    const newPost = new PostMessage(post);
    try{
        //Save the new post in the database
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}