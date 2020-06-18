import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const ProfileView = ()=>{
  return(
    <Grid container>    
      <Grid item xs={4} md={2} >
        <Paper>
          <img src={window.sessionStorage.getItem('profile')} alt="" className="proimg"/>
        </Paper>
      </Grid>
      <Grid item xs={8} md={10}>
        <Paper>
          <p className="id_box">
            <span className="id">{window.sessionStorage.getItem('name')}</span>             
          </p>
        </Paper>
        <Paper> 
            <div style={{border:'2px solid #dadee0'}} className="btn_box">
              <button className="btn" type="button">최근(Home)</button>
              <button className="btn" type="button">만든 세트(Set)</button>
              <button className="btn" type="button">학습한(Set)</button>
            </div>
        </Paper>
      </Grid>
    </Grid>
    )
}

export default ProfileView