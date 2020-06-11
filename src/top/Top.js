import React,{useState, useEffect} from 'react';
import {NavLink, Link, useHistory} from 'react-router-dom';
import './Top.css';
import { Grid, Hidden } from '@material-ui/core';
import { Search,Create,Menu, Face} from '@material-ui/icons';

// 프로필 예시 사진
import img2 from './iu.jpg';

const Top = ({path}) =>{
    const [email, setEmail] = useState(window.sessionStorage.getItem('email'));
    const [name, setName] = useState(window.sessionStorage.getItem('name'));
    const [profile, setProfile] = useState(window.sessionStorage.getItem('profile'));
    const [point, setPoint] = useState(window.sessionStorage.getItem('point'));
    const [admin, setAdmin] = useState(window.sessionStorage.getItem('admin'));
    // const topMenuListAvtive={
    //     width:'1000px',
    //     color:'red',
    //     backgroundColor:'#ffffcc'
    // }

    const history = useHistory();
    const logout = () => {
        window.sessionStorage.clear();
        history.push('/');
    }



    useEffect(()=>{
        setEmail(window.sessionStorage.getItem('email'));
        setName(window.sessionStorage.getItem('name'))
        setProfile(window.sessionStorage.getItem('profile'))
        setPoint(window.sessionStorage.getItem('point'))
        setAdmin(window.sessionStorage.getItem('admin'))
        // if(email === null){
        //     history.push('/');
        // }
    });
    
    if(path === "/"){
        return (
            <div id='topMainFirst'>
                <Grid container spacing={0}>
                    <Grid item xs={3} md={2}>
                        <div className='topMenuFirst'>
                            <Link exact to={email === null ? "/" : "/home/default"} className=' topMenuListLogo' >Ware.gg</Link>
                        </div>
                    </Grid>
                    <Grid item xs={4} md={8}>
                        <div className='topMenuFirst' style={{display:'inherit'}}>
                            {/* 공백채우기용 */} 
                            &nbsp;
                        </div>
                    </Grid>
                        { email === null ? 
                            <Grid item xs={5} md={2}>
                                <div className='topMenuFirst' style={{display:'inherit'}}>
                                    <p className='loginController'>
                                        <span> <Link to="signin" className='MainSign'>로그인</Link></span> 
                                        <span> <Link to="signup" className='MainSign'>회원가입 </Link></span>
                                    </p> 
                                </div>
                            </Grid>
                            : 
                            <Grid item xs={5} md={2}>
                                <div className='topMenuFirst' style={{display:'inherit'}}>
                                    <Link onClick={logout} className='MainLogout'><span>로그아웃</span></Link>
                                </div>  
                            </Grid>
                        }
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
                    <div className='topMenu'>
                        <Link exact to={email === null ? "/" : "/home/default"} className=' topMenuListLogo' >Ware.gg</Link>
                    </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className='topMenu'>
                            <NavLink exact to="/create" className='topMenuList' activeClassName='topMenuListAvtive'>
                                <span><Create/> <div>만들기</div></span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={5}>
                        <div className='topMenu'>
                            <NavLink exact to="/search" className='topMenuListSearch' activeClassName='topMenuListSearchAvtive' >
                                <span><Search/><div><input type='text' placeholder='Search'/></div></span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <div className='topMenu' style={{display:'inherit'}}>
                        {/* 공백채우기용 */} 
                        &nbsp;
                        </div>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <div className='topMenu'>

                            {
                                email === null ? <Link exact to="../signin">
                                                    <span className='userLogin'>로그인</span>
                                                </Link> 
                                :
                                <div>
                                    <Link exact to="/profile" className='topMenuList'>
                                    <div id='profilename'>
                                        <img src={profile} alt='경로오류' className='topMenuProfileImg' />
                                        <span>{name}</span>
                                    </div>
                                    </Link>
                                    <Link onClick={logout} className='userLogout'><span >로그아웃</span></Link>
                                </div>
                            }
                            
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
                                {/* ex */}
                                <span><Create/> </span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={2}>
                        <div className='topMenu'>
                            {
                                email === null ? <Link exact to="../signin">
                                                    <span className='userLogin'><Face/></span>
                                                </Link> 
                                :
                                <div>
                                    <Link exact to="/profile" className='topMenuList'>
                                    <div id='profilename'>
                                        {/* 사용자 프로필 출력 */}
                                        <img src={img2} alt='경로오류' className='topMenuProfileImg' />
                                    </div>
                                    </Link>
                                    {/* 프로필 클릭시 나오는화면 */}
                                    {/* <Link onClick={logout}><span className='userLogout'>로그아웃</span></Link> */}
                                </div>
                            }
                            
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
