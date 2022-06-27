import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req,res) => {
    const { page } = req.query;
    try{
        //Limit on posts per page
        const LIMIT = 8;
        //Get the starting index of every page
        const startIndex = (Number(page) - 1)*LIMIT;
        //Total posts
        const total = await PostMessage.countDocuments({});

        //Retrieve #LIMIT posts and sort by newest first
        const posts = await PostMessage.find().sort({_id: -1 }).limit(LIMIT).skip(startIndex);
        //return the posts
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req,res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ { title } , {tags: { $in: tags.split(',') } }] });
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req,res) => {
    const { id } = req.params;
    try{
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
    //get post info from request (frontend forms)
    const post = req.body;
    //Create new model using info from the forms
    const newPost = new PostMessage( {...post, creator: req.userId, createdAt: new Date().toISOString() });
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

export const likePost = async (req,res) => {
    //Get id from request and rename param as _id
    const { id: _id } = req.params;

    //Check if user authenticated
    if(!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    //Check if id is valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    //Find user
    const post = await PostMessage.findById(_id);
    //Toggle behavior between like and dislike post
    const index = post.likes.findIndex((id) => id===String(req.userId));
    if(index===-1){
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id!== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});
    res.json(updatedPost);
}