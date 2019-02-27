import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Instructions from './Instructions';
class InstructionsComponent extends React.Component{
	render()
	{
		return (
          <React.Fragment>
             <IconButton style={{color:"white"}} onClick={() => {this.props.history.push('/mdecoder/')}}>
             {<ArrowBack />}
            </IconButton>
            <br />
            <Grid container>
              <Grid item xs={12}>
                <Instructions />
              </Grid>
            </Grid>
          </React.Fragment>
			);
	}
}

export default InstructionsComponent;