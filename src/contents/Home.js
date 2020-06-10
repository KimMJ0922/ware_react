import React from 'react';
import MenuTitle from '../menu/MenuTitle'
import Menu  from '../menu/Menu'
import './content.css'
import {Grid} from '@material-ui/core'
 const Home=()=>{
    return(
        <Grid  spacing={0} className='mainView' >
            <Grid item md={2} className='mainViewItem'>
                <Menu/>
            </Grid>
            <Grid item md={10}>
                <MenuTitle/>
            </Grid>
        </Grid> 
    )
}
export default Home;