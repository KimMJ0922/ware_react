import React,{useState, useEffect} from 'react';
import {NavLink, Link, useHistory} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import './Top.css';
import { Grid, Hidden } from '@material-ui/core';
import { Search,Create,Menu, Face} from '@material-ui/icons';
import Signin from '../contents/Signin';
import Signup from '../contents/Signup';
import ChangePassword from '../contents/ChangePassword';
// 프로필 예시 사진
import img2 from './iu.jpg';

const Top = (props) =>{
    const [userInfo, setUserInfo] = useState({
        email : window.sessionStorage.getItem('email'),
        name : window.sessionStorage.getItem('name'),
        profile : window.sessionStorage.getItem('profile')
    });
    const [cnt, setCnt] = useState(0);
    

    const logout = () => {
        //회원 탈퇴에 쓸 예정
        // window.Kakao.API.request({
        //     url: '/v1/user/unlink',
        //     success: function(response) {
        //         console.log(response);
        //     },
        //     fail: function(error) {
        //         console.log(error);
        //     },
        // });

        // window.Kakao.Auth.logout(() => {
        //     console.log(window.Kakao.Auth.getAccessToken());
        // });
        
        window.sessionStorage.clear();
        localStorage.removeItem('autoLogin');
        window.location.replace('/');
    }
    
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const LoginModalOpen = () => {
        setOpen(true);
      };
    
      const LoginModalClose = () => {
        setOpen(false);
      };

      const SingupModalOpen = () => {
        setOpen2(true);
      };
    
      const SingupModalClose = () => {
        setOpen2(false);
      };

      const PassChangeOpen = () => {
        setOpen3(true);
      };
    
      const PassChangeClose = () => {
        setOpen3(false);
      };
      const mobileDisplayOn=()=>{
        if(props.mobileDisplay.display==='none'){
            props.setMobileDisplay({display:'block'})
            props.setMobileDisplayMenu({display:'none'})
        }else{
            props.setMobileDisplay({display:'none'})
            props.setMobileDisplayMenu({display:'block'})
        }
    }

    useEffect(()=>{
        if(props.sname!=='' && props.semail!=='')
            SingupModalOpen();
    },[props.sname, props.semail])

    const searchIn = () => {
        window.sessionStorage.setItem('searchStart',9);
        window.sessionStorage.setItem('searchSort','최신순');
        window.sessionStorage.setItem('searchDivision','제목');
        window.sessionStorage.setItem('searchInclude','검색단어포함');
        window.sessionStorage.setItem('searchText','');
    }

   
    if(props.path === "/"){
        return (
            <div id='topMainFirst'>
                <Grid container spacing={0}>
                    <Grid item xs={3} md={2}>
                        <div className='topMenuFirst'>
                            <Link exact to={userInfo.email === null ? "/" : "/home/default"} className=' topMenuListLogo' style={{color:'#000'}} >Ware.gg</Link>
                        </div>
                    </Grid>
                    <Grid item xs={4} md={8}>
                        <div className='topMenuFirst' style={{display:'inherit'}}>
                            {/* 공백채우기용 */} 
                            &nbsp;
                        </div>
                    </Grid>
                        <Grid item xs={5} md={2}>
                            <div className='topMenuFirst' style={{display:'inherit'}}>
                                <p className='loginController'>
                                    <span> <button onClick={LoginModalOpen} className='MainSign'>로그인</button></span> 
                                    <span> <button onClick={SingupModalOpen} className='MainSign'>회원가입 </button></span>
                                </p> 
                            </div>
                        </Grid>
                </Grid>
            <Modal
            open={open}
            onClose={LoginModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
             
                 <div className="Login_modal_div">
                  <Signin open1={setOpen} open3={setOpen3}/>
                 </div>      
            </Modal> 

            <Modal
            open={open2}
            onClose={SingupModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                 <div className="Login_modal_div">
                  <Signup sname={props.sname} semail={props.semail} open2={setOpen2}/>
                 </div>      
            </Modal>  
            

            <Modal
            open={open3}
            onClose={PassChangeClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <div className="Login_modal_div">
                    <ChangePassword sname={props.sname} semail={props.semail} open2={setOpen2}/>
                </div>      
            </Modal>  
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
                            <Link exact to={userInfo.email === null ? "/" : "/home/default"} className=' topMenuListLogo' >Ware.gg</Link>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className='topMenu'>
                            <NavLink exact to="/create" className='topMenuList'>
                                <span><Create/> <div>만들기</div></span>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={5}>
                        <div className='topMenu' onClick={searchIn}>
                            <NavLink exact to="/search" className='topMenuListSearch' >
                                <span><Search/><div>검색하기</div></span>
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
                            <div>
                                <Link exact to="/home/setting" className='topMenuList'>
                                    <div id='profilename'>
                                        <img src={window.sessionStorage.getItem('profile')} alt='경로오류' className='topMenuProfileImg' />
                                        <span>
                                            {
                                                window.sessionStorage.getItem('provider') === 'kakao' && 
                                                    <img src="/profile/kakao.png" alt="" style={{width:'20px', height:'20px'}}/> 
                                                || window.sessionStorage.getItem('provider') === 'google' && 
                                                    <img src="/profile/google.png" alt="" style={{width:'20px', height:'20px'}}/>
                                                ||  window.sessionStorage.getItem('provider') === 'default' && 
                                                    <img src="/profile/ware_top.png" alt="" style={{width:'20px', height:'20px'}}/>
                                            }
                                            {props.name}
                                        </span>
                                    </div>
                                </Link>
                                <Link onClick={logout} className='userLogout'><span >로그아웃</span></Link>
                            </div>
                        </div>
                    </Grid>
                    </Hidden>

                    {/* 모바일 */}
                    <Hidden only={['md','lg','xl']}>
                    <Grid item xs={3} md={2}>
                    <div className='topMenu'><Link exact to="/home/default" className='topMenuListLogo' >Ware.gg</Link></div>
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
                                userInfo.email === null ? <Link exact to="../signin">
                                                    <span className='userLogin'><Face/></span>
                                                </Link> 
                                :
                                <div>
                                    <Link exact to="/home/setting" className='topMenuList'>
                                        <div id='profilename'>
                                            {/* 사용자 프로필 출력 */}
                                            <img src={window.sessionStorage.getItem('profile')} alt='경로오류' className='topMenuProfileImg' />
                                        </div>
                                    </Link>
                                    {/* 프로필 클릭시 나오는화면 */}
                                    {/* <Link onClick={logout}><span className='userLogout'>로그아웃</span></Link> */}
                                </div>
                            }
                            
                        </div>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <div className='topMenu'><div className='topMenuList' onClick={mobileDisplayOn}><Menu style={{color:'#fff'}}/></div></div>
                    </Grid>
                    </Hidden>
                </Grid>
            </div>
        )
    }
    
}
 
export default Top;
