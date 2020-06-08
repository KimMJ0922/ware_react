import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Top.css';
import { Grid } from '@material-ui/core';
import { Search,Create} from '@material-ui/icons'

 
const Top=()=>{
    // const activeStyle={
    //     color:'red',
    //     backgroundColor:'#ffffcc'
    // }
    return (
        <div className='topMain'>
            
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                <div className='topMenu'><Link exact to="/home" className=' topMenuListLogo' >Ware.gg</Link></div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu'><NavLink exact to="/create" className='topMenuList'><Create/> 만들기</NavLink></div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu'><NavLink exact to="/search" className='topMenuList' ><Search/>Search</NavLink></div>
                </Grid>
                <Grid item xs={6} md={6}>
                    <div className='topMenu' style={{display:'inherit'}}>
                    {/* 공백채우기용 */} 
                    &nbsp;
                    </div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu'><Link exact to="/signin" className='topMenuList'>로그인</Link></div>
                </Grid>
                <Grid item xs={6} md={1}>
                <div className='topMenu'><Link exact to="/signup" className='topMenuList'>회원가입</Link></div>
                </Grid>
            </Grid>
        </div>
    )
}
 
export default Top;
