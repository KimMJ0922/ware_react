import React,{useEffect,useState} from 'react';
import MenuTitle from '../menu/MenuTitle'
import Menu  from '../menu/Menu'
import './content.css'
import {Grid} from '@material-ui/core'
 const Home=(props)=>{
     useEffect(()=>{
        console.log('홈 : '+props.no);
     },[props.no])
    return(
        <Grid  spacing={0} className='mainView'>
            <Grid item xs={12} ms={2} md={2} className='mainViewItem'>
                <Menu no={props.no} setNo={props.setNo}/>
            </Grid>
            <Grid item xs={12} ms={10} md={10}>
                <MenuTitle no={props.no} setNo={props.setNo} name={props.name} setName={props.setName} profile={props.profile} setProfile={props.setProfile}/>
            </Grid>
        </Grid> 
    )
}
export default Home;