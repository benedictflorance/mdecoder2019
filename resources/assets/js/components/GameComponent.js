import React from 'react';
import Grid from '@material-ui/core/Grid';
import Game from './Game/index';
import Menu from './Menu/index';
import BottomNavigation from './Menu/bottomNavigation';
import '../css/navigation.css'
class GameComponent extends React.Component{

	render()
	{
		return (
			  <React.Fragment>
			  <Menu />
              <Game />
              <BottomNavigation className="bottomNavi" />
              </React.Fragment>
			);
	}
}

export default GameComponent;