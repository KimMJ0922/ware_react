import React from 'react';
import {NavLink} from 'react-router-dom';
 import './menu.css';
const Menu=()=>{
    // const activeStyle={
    //     color:'red',
    //     backgroundColor:'#ffffcc'
    // }
    return (
        <div className='mainMenuList'>
            <ul>
                <li>
                    <NavLink exact to="/home/default">Home</NavLink>
                </li>
                <li>
                    <NavLink exact to="/home/diagram">다이어그램 찾아보기</NavLink>
                </li>
                <li>
                    <NavLink exact to="/home/friend">친구 추천</NavLink>
                </li>
                <li>
                    <NavLink exact to="/home/setting">설정</NavLink>
                </li>
                <li>
                    <NavLink exact to="/home/set">세트</NavLink>
                </li>
                <li>
                    <NavLink exact to="/home/folder">폴더</NavLink>
                </li>
                <li>
                    <NavLink exact to="/home/guild">클래스</NavLink>
                </li>
            </ul> 
        </div>
    )
}
 
export default Menu;