import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import img1 from './iu03.jpg';
import './MenuDtail.css';
import { Button } from '@material-ui/core';
const Set=()=>{
    return(
        <div className="sq_body">
    <Grid container spacing={3}>
        <Grid item md={2} xs={2} >
          <Paper>
              <img src={img1} alt="" className="sq_proimg"/>
              </Paper>
        </Grid>
        <Grid item md={6} xs={6}>
          <Paper>
              <span className="sq_id">아이디 들어갈 자리</span>
          </Paper>
          <Paper> 
              <div>
                <button className="sq_btn" type="button">최근(Home)</button>
                <button className="sq_btn" type="button">만든 세트(Set)</button>
                <button className="sq_btn" type="button">학습한(Set)</button>
                </div>
          </Paper>
        </Grid>
        
        <Grid item md={4} xs={4}>
          <Paper>
          <span className="sq_name">이름 들어갈 자리</span>
          </Paper>
        </Grid>
      </Grid> 
      </div>
    )
}
export default Set;