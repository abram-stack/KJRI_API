export default(state = {archives: []}  , action ) =>{

  switch (action.type) {
    case 'ARCHIVE_LIST_REQUEST':
      return {loading: true, archives: []};
    case 'ARCHIVE_LIST_SUCCESS':
      return {loading: false, archives: action.payload};
    // case 'CREATE':
    //   return archives;
    default:
      return state;
  }
}