import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import './st.css'

const Exam=()=>{
    return(
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper ><div className="a1">1</div></Paper>
            </Grid>
            <Grid item xs={6} md={6}>
              <Paper><div className="b">2</div></Paper>
            </Grid>
            <Grid item xs={6} md={12}>
               <Paper><div className="c">3</div></Paper>
            </Grid>
        </Grid>
        </>
    )
}
export default Exam;