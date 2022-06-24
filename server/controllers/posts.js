import mongoose from 'mongoose';
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

export const updatePost = async (req,res) => {
    //Get id from request and rename param as _id
    const { id: _id } = req.params;
    const post = req.body;
    //Check if id is valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    //Get id from request and rename param as _id
    const { id: _id } = req.params;
    //Check if id is valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    //Find post and delete
    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: "Post deleted successfully"});
}