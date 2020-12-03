// @desc we import everything from the action from api, 
import * as api from '../api';


// action creators
export const getArchives = () => async(dispatch) => {
  try {
    dispatch({type: 'ARCHIVE_LIST_REQUEST'})

    const { data } = await api.fetchArchives();

    dispatch({type: 'ARCHIVE_LIST_SUCCESS', payload: data});
  } catch (err) {
    console.log(err.message);
  }

  
}