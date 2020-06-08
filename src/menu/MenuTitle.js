import React,{useEffect} from 'react';
import {Diagram,Folder,Friend,Guild,Set,Setting,Default} from '../menuDtail';/*index.js호출*/
import { Route, Switch } from 'react-router-dom';
import './menu.css';
const MenuTitle=({match})=>{
    useEffect(()=>{
        console.log(match);
    });
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
            </Switch>
        </div>
    )
}
export default MenuTitle;