import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root : {
		width:'100%',
		marginTop:theme.spacing.unit*3,
		overflowX:'auto',
	},
	table:{
		minWidth:700,
	},
});	

const rows = [
  { id : 1, username:'cr7suna98', email : 'psudarshan98@gmail.com' , score : '80' },
  { id : 2, username:'ajish45', email : 'abc@gmail.com' , score : '60' },
  { id : 3, username:'hari67', email : 'xyzdcfd@gmail.com' , score : '50' },
  { id : 4, username:'akash23', email : 'akash1998@gmail.com' , score : '20' },
  { id : 5, username:'nripesh', email : 'neruppu@gmail.com' , score : '10' }
]

 const headerStyle = {
 	textAlign: 'center',
 	fontWeight:'bold',
 	fontSize:'1.5em'
 };

 function simpleTable(props){
 	  return (
       <Paper className={props.classes.root}>
         <Table className={props.classes.table}>
           <TableHead>
             <TableRow>
               <TableCell>Rank</TableCell>
               <TableCell>Username</TableCell>
               <TableCell>Email</TableCell>
               <TableCell>Score</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {
             	rows.map(row => {
             		return (
                       <TableRow key={row.id}>
                         <TableCell>{row.id}</TableCell>
                         <TableCell>{row.username}</TableCell>
                         <TableCell>{row.email}</TableCell>
                         <TableCell>{row.score}</TableCell>
                       </TableRow>
             			);
             	})
             }
           </TableBody>
         </Table>
       </Paper>
 
 	  	);
  }

simpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const FinalTable = withStyles(styles)(simpleTable);

class Leaderboard extends Component {

	render() {
		return (
			<React.Fragment>
            <h2 style={headerStyle}><u>Leaderboard</u></h2>
            <br />
            <FinalTable />
            </React.Fragment>
			);
	}
}

export default Leaderboard;