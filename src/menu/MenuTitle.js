import React,{useEffect,useState} from 'react';
import {Diagram,Folder,Friend,Guild,Set,Setting,Default} from '../menuDtail';/*index.js호출*/
import {Board,BoardInsert,BoardItem,BoardItems,BoardList,BoardUpdate} from '../board';/*index.js호출*/
import { Route, Switch } from 'react-router-dom';
import './menu.css';
const MenuTitle=({match})=>{
    const [nowProfileImg, setProfileImg] = useState(window.sessionStorage.getItem('profile'));

    useEffect(()=>{
        console.log(match);
    });

    useEffect(()=>{
        console.log('프로필 바뀜');
      },[nowProfileImg]);
    return(
        <div className='mainMenuDetail'>
            <Switch>

            

            <Route exact path="/home/default" component={Default}/>
            
            <Route exact path="/home/diagram" component={Diagram}/>

            <Route exact path="/home/friend" component={Friend}/>

            <Route exact path="/home/setting" component={Setting}/>

            <Route exact path="/home/set" component={Set}/>

            <Route exact path="/home/folder" component={Folder}/>

            <Route exact path="/home/guild" component={Guild}/> 

            <Route exact path="/home/board" component={Board}/>

            <Route exact path="/home/Boardinsert" component={BoardInsert}/>

            <Route exact path="/home/board/item/:board_no" component={BoardItem}/>

            <Route exact path="/home/boarditems" component={BoardItems}/>
            
            <Route exact path="/home/Boardlist" component={BoardList}/>

            <Route exact path="/home/boardupdate" component={BoardUpdate}/>

            </Switch>
        </div>
    )
}
export default MenuTitle;