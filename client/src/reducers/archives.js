export default(archives =[] , action ) =>{

  switch (action.type) {
    case 'FETCH_ALL':
      return archives;
    case 'CREATE':
      return archives;
    default:
      return archives;
  }
}