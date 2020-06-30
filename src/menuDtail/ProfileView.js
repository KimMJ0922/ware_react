import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const ProfileView = (props) =>{
  const clickBtn=(e)=>{
    props.changeComponent(e.target.name);
  }
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
              <button className="btn" type="button" onClick={clickBtn} name="Set">만든 세트</button>
              <button className="btn" type="button" onClick={clickBtn} name="BoardSet">구매 세트</button>
              <button className="btn" type="button" onClick={clickBtn} name="SellsSet">판매 세트</button>
            </div>
        </Paper>
      </Grid>
    </Grid>
    )
}

export default ProfileView