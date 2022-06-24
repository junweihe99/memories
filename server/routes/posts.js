//Create routes for backend components
import express from 'express';
//Import post requests
import { getPosts, createPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

//http://localhost:5000/posts/
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;