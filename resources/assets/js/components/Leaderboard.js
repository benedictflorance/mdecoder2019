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
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router-dom';
import { getLeaderboard } from '../actions/Leaderboard';

const overallStyle ={
  table: {
    marginLeft: '0%',
    marginRight: '0%',
    marginTop: '20px',
    fontSize: '1.3em',
    textAlign: 'left',
    fontFamily:"Audiowide",
}
}

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
		overflowX:'auto',
	},
	table:{
		minWidth:"100%",
	},
});	

 const headerStyle = {
 	textAlign: 'center',
 	fontSize:'1.5em',
  fontFamily:"Audiowide",
  color:"white"
 };

 class PaginationTable extends Component {
 
   constructor()
    {
      super();
      this.state = {
    rows : [],
    page:0,
    rowsPerPage:10
  }

    }  

      componentDidMount()
      {
        this.props.getLeaderboard();
      }


  handleChangePage(event, page){
       this.setState({ page });
       this.props.getLeaderboard(page+1);
      };

    handleChangeRowsPerPage(event) {
       this.setState({ rowsPerPage: parseInt(event.target.value) });
    };
   
    render()
    {
      const { classes , leaderboard , isAuthenticated } = this.props;
      console.log(leaderboard);
      console.log(isAuthenticated);
       if(!leaderboard) return null;
       if(leaderboard){
         //console.log(leaderboard.loggedInUserScore.user_id);
         //console.log("wowwww"); 
         //
       }
       const {current_page, last_page, from } = leaderboard.data;
       let count = from;
       const mappedLeaderboardRow = leaderboard.data.data.map((item,i,arr) => (
         <TableRow key={item.user_id}>
           <TableCell style={{ fontSize:"1.0em"}}>{count++}</TableCell>
           <TableCell style={{ fontSize:"1.0em"}}>{item.username}</TableCell>
           <TableCell style={{ fontSize:"1.0em"}}>{item.email}</TableCell>
           <TableCell style={{ fontSize:"1.0em"}}>{item.score ? item.score : 0}</TableCell>
         </TableRow>
        ));
      const emptyRow=isAuthenticated ? (
         <TableRow>
           <TableCell>.</TableCell>
           <TableCell>.</TableCell>
           <TableCell>.</TableCell>
           <TableCell>.</TableCell>
         </TableRow>
       ) : null;

       const userRow = isAuthenticated && leaderboard.loggedInUserScore ? (
         <TableRow >
          <TableCell style={{ fontSize:"1.0em"}}>{leaderboard.loggedInUserScore.user_rank}</TableCell>
          <TableCell style={{ fontSize:"1.0em"}}>{leaderboard.loggedInUserScore.username}</TableCell>
          <TableCell style={{ fontSize:"1.0em"}}>{leaderboard.loggedInUserScore.email}</TableCell>
          <TableCell style={{ fontSize:"1.0em"}}>{leaderboard.loggedInUserScore.score ? leaderboard.loggedInUserScore.score : 0 }</TableCell>
         </TableRow>
       ) : null;

      const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <React.Fragment>
            <IconButton style={{color:"white"}} onClick={() => {this.props.history.push('/')}}>
             {<ArrowBack />}
            </IconButton>
            <h1 style={headerStyle}>M - D E C O D E R  2019</h1>
            <h2 style={headerStyle}>Leaderboard</h2>
            <Grid item xs={12}>
            <Paper className={classes.root}>
             <Table className={classes.table} style= {overallStyle.table}>
              <TableHead>
               <TableRow>
                 <TableCell style={{ fontSize:"1.0em"}}>Rank</TableCell>
                 <TableCell style={{ fontSize:"1.0em"}}>Username</TableCell>
                 <TableCell style={{ fontSize:"1.0em"}}>Email</TableCell>
                 <TableCell style={{ fontSize:"1.0em"}}>Score</TableCell>
               </TableRow>
              </TableHead>
              <TableBody>
                {mappedLeaderboardRow}
                {emptyRow}
                {userRow}
              </TableBody>
              <TableFooter>
               <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={1}
                  count={leaderboard.data.total}
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
             </Grid>
            </React.Fragment>
          );
    }
 }

 PaginationTable.propTypes = {
   classes: PropTypes.object.isRequired,
 }

 const FinalTable = withStyles(styles)(PaginationTable);


const mapStateToProps = state => {
  const { isAuthenticated } = state.user;
  const { leaderboard } = state.leaderboard;
  return { leaderboard, isAuthenticated };
};

const TableRouter = connect(mapStateToProps, { getLeaderboard })(FinalTable);
export default withRouter(TableRouter);
