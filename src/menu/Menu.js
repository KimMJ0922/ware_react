import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {Home, Dashboard, Storefront, Settings, AllInbox, Folder, Class} from '@material-ui/icons'
import './menu.css';
import { Grid, Hidden } from '@material-ui/core';
const Menu=(props)=>{
    
    const[setCnt, setSetCnt] = useState(0);
    useEffect(() => {
        const getSetCount = async() => {
            let url = "http://localhost:9000/getsetcount";
            try{
                let cnt = await axios.post(url,{no : window.sessionStorage.getItem('no')});
                setSetCnt(cnt.data);
            }catch(e){
                console.log(e);
            }
        }
        getSetCount();
    },[])
    // const menuClick = () => {
    //     if(props.mobileDisplay === 'none'){
    //         props.setMobileDisplay({display : 'block'});
    //         props.setMobileDisplayMenu({display : 'none'});
    //     }else {
    //         // if(props.mobileDisplay === 'block')
    //         props.setMobileDisplay({display : 'none'});
    //         props.setMobileDisplayMenu({display : 'block'});
    //     }
        
    // }
    const menuClickAction=()=>{
        props.menuClick();
    }
    return (
            <div className='mainMenuList' onClick={menuClickAction}>
                <div>
                    <NavLink exact to="/home/default" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <Home className='MenuMainIcon'/>
                            <div>Home</div>
                        </span>
                    </NavLink>
                </div>
                <div>
                    <NavLink exact to="/home/diagram" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <Dashboard className='MenuMainIcon'/>
                            <div>다이어그램</div>
                        </span>  
                    </NavLink>
                </div>
                <div>
                    <NavLink exact to="/home/board" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <Storefront className='MenuMainIcon'/>
                            <div>장터</div>
                        </span>
                    </NavLink>
                </div>
                <div>
                    <NavLink exact to="/home/setting" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <Settings className='MenuMainIcon'/>
                            <div>설정</div>
                        </span>
                    </NavLink>
                </div>
                <div className='hrLine'> &nbsp;</div>
                <div>
                    <NavLink exact to="/home/set" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <AllInbox className='MenuMainIcon'/>
                            <div>세트{setCnt !== 0 && '('+setCnt+')'}</div>
                        </span>
                    </NavLink>
                </div>
                <div>
                    <NavLink exact to="/home/folder" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <Folder className='MenuMainIcon'/>
                            <div>폴더</div>
                        </span>
                    </NavLink>
                </div>
                <div>
                    <NavLink exact to="/home/guild" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                        <span>
                            <Class className='MenuMainIcon'/>
                            <div>클래스</div>
                        </span>
                    </NavLink>
                </div>
            </div>
            
    )
}
 
export default Menu;