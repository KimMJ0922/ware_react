import React from 'react';
import {NavLink} from 'react-router-dom';
import {Home, Dashboard, Face, Settings, AllInbox, Folder, Class} from '@material-ui/icons'
import './menu.css';
const Menu=()=>{
    return (
        <div className='mainMenuList'>
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
                <NavLink exact to="/home/friend" className='mainMenuListItem' activeClassName='mainMenuListActive'>
                    <span>
                        <Face className='MenuMainIcon'/>
                        <div>친구 추천</div>
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
                        <div>세트</div>
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