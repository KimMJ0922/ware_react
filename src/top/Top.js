import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Top.css';
import { Grid, Hidden } from '@material-ui/core';
import { Search,Create,Menu} from '@material-ui/icons';
// 프로필 예시 사진
import img2 from './iu.jpg';

const Top = ({path}) =>{
    // const topMenuListAvtive={
    //     width:'1000px',
    //     color:'red',
    //     backgroundColor:'#ffffcc'
    // }
    if(path === "/"){
        return (
            <div id='topMainFirst'>
                <Grid container spacing={0}>
                <Grid item xs={5} md={5}>
                        <div className='topMenuFirst' style={{display:'inherit'}}>
                            {/* 공백채우기용 */} 
                            &nbsp;
                        </div>
                    </Grid>
                    <Grid item xs={2} md={2}>
                    <div className='topMenuFirst'><Link exact to="/home/default" className=' topMenuListLogo' >Ware.gg</Link></div>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <div className='topMenuFirst' style={{display:'inherit'}}>
                            {/* 공백채우기용 */} 
                            &nbsp;
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }else{
        return (
            <div id='topMain'>
                <Grid container>
                    

                    {/* 웹 */}
                    <Hidden only={['xs','sm']}>
                    <Grid item xs={2} md={2}>
                    <div className='topMenu'><Link exact to="/" className=' topMenuListLogo' >Ware.gg</Link></div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className='topMenu'>
                            <NavLink exact to="/create" className='topMenuList' activeClassName='topMenuListAvtive'>
                                <span><Create/> <div>만들기</div></span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className='topMenu'>
                            <NavLink exact to="/search" className='topMenuList' activeClassName='topMenuListAvtive' >
                                <span><Search/><div>Search</div></span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <div className='topMenu' style={{display:'inherit'}}>
                        {/* 공백채우기용 */} 
                        &nbsp;
                        </div>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <div className='topMenu'>
                            <Link exact to="/signup" className='topMenuList'>
                                    <div id='profilename'>
                                        <img src={img2} alt='경로오류' className='topMenuProfileImg' />
                                        <span>I_U_jiyumi</span>
                                    </div>
                            </Link>
                        </div>
                    </Grid>
                    </Hidden>

                    {/* 모바일 */}
                    <Hidden only={['md','lg','xl']}>
                    <Grid item xs={3} md={2}>
                    <div className='topMenu'><Link exact to="/" className=' topMenuListLogo' >Ware.gg</Link></div>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <div className='topMenu' style={{display:'inherit'}}>
                        {/* 공백채우기용 */} 
                        &nbsp;
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className='topMenu'>
                            <NavLink exact to="/search" className='topMenuList' activeClassName='topMenuListAvtive' >
                                <span><Search/></span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className='topMenu'>
                            <NavLink exact to="/create" className='topMenuList' activeClassName='topMenuListAvtive'>
                                <span><Create/> </span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={2}>
                        <div className='topMenu'>
                            <Link exact to="/signup" className='topMenuList'>
                                <span>
                                    <div>
                                        <img src={img2} alt='경로오류' className='topMenuProfileImg' />
                                    </div>
                                </span>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <div className='topMenu'><div className='topMenuList'><Menu/></div></div>
                    </Grid>
                    </Hidden>
                </Grid>
            </div>
        )
    }
    
}
 
export default Top;
