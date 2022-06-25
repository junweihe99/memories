import { AUTH } from '../constants/actionTypes';

//Import every function as api
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        //login user
        const { data } = await api.signIn(formData);
        dispatch ({ type: AUTH, data });
        //Navigate to homepage
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        //sign up the user
        const { data } = await api.signUp(formData);
        dispatch ({ type: AUTH, data });
        //Navigate to homepage
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};