import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const headerStyle = {
 	textAlign: 'center',
 	fontSize:'1.5em',
  fontFamily:"Audiowide",
  color:"white"
 };

export default class pageNotFound extends React.Component
{
	render()
	{
		return (
             
          <Grid container>
            <Grid item xs={12}>
              <h1 style={headerStyle}>M - D E C O D E R  2019</h1>
              <br />
              <div style={{ fontSize: '1.5em', marginTop: '20px',color:"white",textAlign:"center"}}>
              Page Not found.<br />
              Go back to the 
              <Link style={{color:"white"}} to="/mdecoder/">
               [GAME]
              </Link>
              </div>
            </Grid>
          </Grid>
			);

	}
}