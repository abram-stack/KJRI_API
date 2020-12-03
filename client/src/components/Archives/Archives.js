import React from 'react'
import Archive from './Archive/Archive'
// import useStyles from '../../style'

// fetch data from redux store
import {useSelector } from 'react-redux'

const Archives = () => {
  
  // const archives = useSelector( (state) => state.archives);
  // console.log(archives);
  const archives = [];
  // const classes = useStyles();
   
  return (
    <>
      {archives.map(archive => (
        <Archive archive ={archive}/>
      ))}
      
    </>
  )
}

export default Archives
// {/* {archives.map(archive => (
//       <Archive archive={archive}/>
//     ))} */}