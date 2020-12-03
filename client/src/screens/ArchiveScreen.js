import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Archives from '../components/Archives/Archives'
import Form from '../components/Form/Form'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import useStyles from '../style'

import { getArchives } from '../actions/archives'

const ArchiveScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getArchives());
  }, [dispatch]) 
  
  return (
    <Container maxWidth='lg'>
      <AppBar classname={classes.appBar} position='static' color='inherit'>
        <Typography classname={classes.Typography} variant='h2' align='center'> Archives  :</Typography>
      </AppBar>
      <Grow in >
        <Container>
          <Grid container justify='space-between' alignItems='stretch' space={3}>
            <Grid item xs={12} sm={7}>
              <Archives/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default ArchiveScreen

















// import React, { useState, useEffect } from 'react'
// import { Row, Col} from 'react-bootstrap'
// import Archive from '../components/Archives/Archive'
// import axios from 'axios'



// const ArchiveScreen = () => {
//   const [archives, setArchives] = useState([])

//   useEffect( () => {
//     const fetchArchives = async () => {
//       const { data } = await axios.get('/api/archives');
//       // now we have the data
      
//       setArchives(data);
//     }
//     fetchArchives();
//   }, [archives])

//   return (
//     <>
//       <h1>Archive list</h1>
//       <Row>
//         {archives.map(archive => 
//           <Col key={archive._id} sm={12} md={6} lg={4} xl={3}>
//            <Archive archive= {archive}/>
//           </Col>
//         )}
//       </Row>
//     </>
//   )
// }

// export default ArchiveScreen

 