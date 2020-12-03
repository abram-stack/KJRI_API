import React from 'react'
import Archive from './Archive/Archive'
// import useStyles from '../../style'

// fetch data from redux store
import {useSelector } from 'react-redux'

const Archives = () => {
  
  const archives = useSelector( (state) => state.archives);

  // const classes = useStyles();
  console.log(archives);
  return (
    <>
      <Archive/>
      <Archive/>
      <Archive/>
    </>
  )
}

export default Archives
