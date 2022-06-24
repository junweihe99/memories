import axios from 'axios';

//URL pointing to backend route
const url = 'http://localhost:5000/posts';

//Returns all posts in the database
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);