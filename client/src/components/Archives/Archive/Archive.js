import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useStyles from '../../../style'

const Archive = () => {
  const classes = useStyles();
  return (
    <>
      <Card className= 'my-3 p-3 rounded'> 
       <Link to={`/api/archives/`}>
         <Card.Title as='div'>
           <strong>title</strong>  
         </Card.Title>
       </Link>
     </Card>
    </>
  )
}

export default Archive








// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Card } from 'react-bootstrap'

// const Archive = ({archive}) => {
//   return (
//     <Card className= 'my-3 p-3 rounded'> 
//       <Link to={`/api/archives/${archive._id}`}>
//         <Card.Title as='div'>
//           <strong>{archive.name}</strong>  
//         </Card.Title>
//       </Link>
//     </Card>
//   )
// }

// export default Archive