import axios from 'axios';

//URL pointing to backend route
const url = 'http://localhost:5000/posts';

//Returns all posts in the database
export const fetchPosts = () => axios.get(url);