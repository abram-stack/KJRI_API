// @desc we import everything from the action from api, 
import * as api from '../api';


// action creators
export const getArchives = () => async(dispatch) => {
  try {
    const { data } = await api.fetchArchives();

    dispatch({type: 'FETCH_ALL', payload: data});
  } catch (err) {
    console.log(err.message);
  }

  
}