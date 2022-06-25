//Create routes for backend components
import express from 'express';
//Import post requests
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
//Verify user permissions before action
import auth from '../middleware/auth.js';

const router = express.Router();

//http://localhost:5000/posts/
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;