import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Top.css';
import { Grid } from '@material-ui/core';
import { Search,Create} from '@material-ui/icons'

 
const MainTop=()=>{
    // const topMenuListAvtive={
    //     width:'1000px',
    //     color:'red',
    //     backgroundColor:'#ffffcc'
    // }
    return (
        <div className='topMainfirst'>
            
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                <div className='topMenu'><Link exact to="/home/default" className=' topMenuListLogo' >Ware.gg</Link></div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu' style={{display:'inherit'}}>
                    {/* 공백채우기용 */} 
                    &nbsp;
                    </div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu' style={{display:'inherit'}}>
                    {/* 공백채우기용 */} 
                    &nbsp;
                    </div>
                </Grid>
                <Grid item xs={6} md={6}>
                    <div className='topMenu' style={{display:'inherit'}}>
                    {/* 공백채우기용 */} 
                    &nbsp;
                    </div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu' style={{display:'inherit'}}>
                    {/* 공백채우기용 */} 
                    &nbsp;
                    </div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu' style={{display:'inherit'}}>
                    {/* 공백채우기용 */} 
                    &nbsp;
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
 
export default MainTop;
