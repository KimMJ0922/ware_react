import React,{useEffect,useState} from 'react';
import {Diagram,DiagramList, Folder,Friend,Set,Setting,Default} from '../menuDtail';/*index.js호출*/
import {Board} from '../board';/*index.js호출*/
import BoardInsert from '../board/BoardInsert';
import { Route, Switch } from 'react-router-dom';
import './menu.css';
const MenuTitle=(props)=>{
    useEffect(()=>{
        props.setNo(props.no);
    },[props.no])
    return(
        <div className='mainMenuDetail'>
            <Switch>

                <Route exact path="/home/default">
                    <Default no={props.no} setNo={props.setNo}/>
                </Route>
                
                <Route exact path="/home/diagram" component={Diagram}/>
                
                <Route exact path="/home/diagramlist" component={DiagramList}/>

                <Route exact path="/home/friend" component={Friend}/>

                <Route exact path="/home/setting">
                    <Setting name={props.name} setName={props.setName} profile={props.profile} setProfile={props.setProfile}/>
                </Route>
            
                <Route exact path="/home/set" >
                    <Set no={props.no} setNo={props.setNo}/>
                </Route>

                <Route exact path="/home/folder" component={Folder}/>

                <Route exact path="/home/board" component={Board}/>
                <Route exact path="/home/board/insert" component={BoardInsert} />
            </Switch>
        </div>
    )
}
export default MenuTitle;