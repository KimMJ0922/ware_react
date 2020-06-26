import React,{useEffect,useState} from 'react';
import MenuTitle from '../menu/MenuTitle'
import Menu  from '../menu/Menu'
import './content.css'
import {Grid, Hidden} from '@material-ui/core'
 const Home=(props)=>{
     useEffect(()=>{
        console.log('홈 : '+props.no);
     },[props.no])
     
    const menuClick = () => {
        if(props.mobileDisplay === 'none'){
            props.setMobileDisplay({display : 'block'});
            props.setMobileDisplayMenu({display : 'none'});
        }else {
            // if(props.mobileDisplay === 'block')
            props.setMobileDisplay({display : 'none'});
            props.setMobileDisplayMenu({display : 'block'});
        }
        
    }
   
    useEffect(() => {
        if(props.mobileDisplay.display === 'none'){
            //props.setMobileDisplayMenu({display : 'block'});
            //props.setMobileDisplayMenu({display:'block'})
        }
        
    },[props.mobileDisplay])
    return(
        <Grid  spacing={0} className='mainView'>
            {/* 웹 */}
            <Hidden only={['xs','sm']}>
                <Grid item xs={12} sm={2} md={2} className='mainViewItem'>
                    <Menu no={props.no} setNo={props.setNo} menuClick={menuClick}/>
                </Grid>
            </Hidden>
             {/* 모바일 */}
            <Hidden only={['md','lg','xl']} style={props.mobileDisplay}>
                <Grid item xs={12} sm={2} md={2} className='mainViewItem'  style={props.mobileDisplay}>
                    <Menu no={props.no} setNo={props.setNo} setMobileDisplay={props.setMobileDisplay} mobileDisplay={props.mobileDisplay} setMobileDisplayMenu={props.setMobileDisplayMenu}
                            menuClick={menuClick}/>
                </Grid>
            </Hidden>
    {/* 웹 */}
        <Hidden only={['xs','sm']}>
            <Grid item  md={10}>
                <MenuTitle no={props.no} setNo={props.setNo} name={props.name} setName={props.setName} profile={props.profile} setProfile={props.setProfile}/>
            </Grid>
        </Hidden>
    {/* 모바일 */}
        <Hidden only={['md','lg','xl']}>
            <Grid item xs={12} sm={10} md={10} style={props.mobileDisplayMenu}>
                    <MenuTitle no={props.no} setNo={props.setNo} name={props.name} setName={props.setName} profile={props.profile} setProfile={props.setProfile}/>
                </Grid>
                </Hidden>
            </Grid> 
    )
}
export default Home;