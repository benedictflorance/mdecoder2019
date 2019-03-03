import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Instructions extends React.Component{
	render()
	{
		return (
           
            <Grid container >
              <Grid item xs={12}>
                 <Paper style={{padding:"5px",fontSize:"1.3em",fontFamily:"Audiowide"}}>
                   <h2 style={{textAlign:"center"}}>Instructions</h2>
                    <ol>
                      <li>
                       This is an online event spanning over three days and will be
                       open for 3 hours each day from 19:00 to 22:00.<br />{' '}
                      </li>
                    <br />
                      <li>
                       {' '}
                       The participant can start the contest anytime within this time
                       frame and will be allowed to play for 1.5 hours from their start
                       time.<br />
                      </li>
                    <br />
                      <li>
                       The event will have 3 sections (easy, medium and hard). <br />
                      </li>
                    <br />
                      <li>
                       The participant will be directed to the hard section first and
                       the other sections remain locked.<br />
                      </li>
                    <br />
                      <li>
                       Once the participant feels the need to shift to the next
                       section (medium), they can permanently lock the hard section
                       and move on to the medium section by clicking on "Next
                       Section" button. <br />
                      </li>
                    <br />
                      <li>
                       The same procedure is applicable for the transition from
                       medium to easy. <br />
                      </li>
                    <br />
                      <li>
                       The participant with most points at the end of the third day
                       wins. <br />
                      </li>
                    <br />
                      <li>
                        <b>For Numerical type questions, type in Numerical answer,</b><br /><b>For MCQ questions type in 'A' or 'B' or 'C' or 'D' corresponding to the correct option in the answerbox</b><br/>
                      </li>
                      <br />
                      <li>
                       The participant will have a maximum of 3 attempts for each
                       question.
                       <br />
                      </li>
                    <br />
                       <li>
                        Missed out on a day of participation? Worry not. You can still
                        solve the previous day's questions within the 5 hour period.
                        As you may expect, the scores will be reduced for those
                        problems. You can only see questions from the immediate
                        previous day. That is, you cannot see 1st day's questions on
                        3rd day.<br />
                       </li>
                    <br />
                       <li>
                        The scoring will be based on the time at which you submit the
                       right answer.<br />
                        </li>
                     <br />
                   </ol>
                 </Paper>
              </Grid>
            </Grid>
			);
	}
}

export default Instructions;