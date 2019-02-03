import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { getLeaderboard } from '../actions/Leaderboard';

const actionsStyles = theme => ({
	root:{
		flexShrink: 0,
		color:theme.palette.text.secondary,
		marginLeft:theme.spacing.unit*2.5
	},
});

class TablePaginationActions extends Component {
	handleFirstPageButtonClick(event) {
		this.props.onChangePage(event,0);
	};

	handleBackButtonClick(event) {
        this.props.onChangePage(event, this.props.page - 1);
    };

  handleNextButtonClick(event) {
        this.props.onChangePage(event, this.props.page + 1);
    };

  handleLastPageButtonClick(event) {
        this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));

    };

    render() {
    	const { classes , count , page, rowsPerPage , theme } = this.props;

    	 return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick.bind(this)}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick.bind(this)}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick.bind(this)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick.bind(this)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
    }

}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
	root : {
		width:'100%',
		marginTop:theme.spacing.unit*3,
		overflowX:'scroll',
	},
	table:{
		minWidth:700,
    background: '#050813',
    color: '#ffffff',
	},
});	

 const headerStyle = {
 	textAlign: 'center',
 	fontWeight:'bold',
 	fontSize:'1.5em'
 };

 class PaginationTable extends Component {
 
   constructor()
    {
    	super();
    	this.state = {
 		rows : [
            { id : 1, username:'cr7suna98', email : 'psudarshan98@gmail.com' , score : '80' },
            { id : 2, username:'ajish45', email : 'abc@gmail.com' , score : '60' },
            { id : 3, username:'hari67', email : 'xyzdcfd@gmail.com' , score : '50' },
            { id : 4, username:'akash23', email : 'akash1998@gmail.com' , score : '20' },
            { id : 5, username:'nripesh', email : 'neruppu@gmail.com' , score : '10' },
            { id : 6, username:'gautam', email : 'uiui@gmail.com' , score : '9' },
            { id : 7, username:'vikas', email : 'nsxsx@gmail.com' , score : '8' },
            { id : 8, username:'ashwin', email : 'ded@gmail.com' , score : '7' },
            { id : 9, username:'nandha', email : 'kmmo@gmail.com' , score : '6' },
            { id : 10, username:'rishav', email : 'loeo@gmail.com' , score : '5' },
            { id : 11, username:'somesh', email : 'ybn@gmail.com' , score : '4' },
            { id : 12, username:'hari', email : 'sxsxs@gmail.com' , score : '3' },
            { id : 13, username:'iide', email : 'oo0@gmail.com' , score : '2' },
            { id : 14, username:'oow', email : 'nassw@gmail.com' , score : '1' },
            { id : 15, username:'dcdc', email : 'jnc@gmail.com' , score : '0' },
            { id : 16, username:'neel', email : 'zx@gmail.com' , score : '-1' },

 		],
 		page:0,
 		rowsPerPage:5
 	}

    }  

  handleChangePage(event, page){
       this.setState({ page });
    };

    handleChangeRowsPerPage(event) {
       this.setState({ rowsPerPage: parseInt(event.target.value) });
    };
   
    render()
    {
      const { classes } = this.props;
      const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
             <Table className={classes.table}>
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
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
                {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              </TableBody>
              <TableFooter>
               <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage.bind(this)}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
             </Table>
            </Paper>
          );
    }
 }

 PaginationTable.propTypes = {
   classes: PropTypes.object.isRequired,
 }

 const FinalTable = withStyles(styles)(PaginationTable);

class Leaderboard extends Component {

  componentDidMount()
  {
    this.props.getLeaderboard();
  }
  render() {
      const { leaderboard , isAuthenticated } = this.props;
      console.log(leaderboard);
    return (
      <React.Fragment>
            <h2 style={headerStyle}><u>Leaderboard</u></h2>
            <br />
            <FinalTable />
            </React.Fragment>
      );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.user;
  const { leaderboard } = state.leaderboard;
  return { leaderboard, isAuthenticated };
};

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);
