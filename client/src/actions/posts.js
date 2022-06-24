//Import every function as api
import * as api from '../api';


//Action Creators
//Use async dispatch function from thunk because we are dealing with async logic
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type:'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}