import React from 'react'
import Archive from './Archive/Archive'
// import useStyles from '../../style'

// fetch data from redux store
import {useSelector } from 'react-redux'

const Archives = () => {
  
  const archiveList = useSelector( (state) => state.archives);
  const { loading, error, archives } = archiveList
  console.log(error, loading, archives);

   
  return (
    <>
      <h1>Archive LIST</h1>
       {archives.map((archive) => (
        <Archive key={archive._id} archive ={archive}/>
      ))} 
    </>
  )
}

export default Archives
// {/* {archives.map(archive => (
//       <Archive archive={archive}/>
//     ))} */}