import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Game from './Game/index';
import Menu from './Menu/index';
import BottomNavigation from './Menu/bottomNavigation';
import '../css/navigation.css'

import Navbar from './Menu/navbar';
class GameComponent extends React.Component{    

	render()
	{
		return (
			  <div>
              <Navbar /> 
              <Grid container>
                 <Grid item sm={3} xs={12} style={{textAlign: 'center',fontSize: '1em',overflowY:"auto"}}> 
			     <Menu />
			     </Grid>
			     <Grid item sm={9} xs={12}>
                 <Game />
                 </Grid>
              </Grid>
              </div>
			);
	}
}

export default GameComponent;