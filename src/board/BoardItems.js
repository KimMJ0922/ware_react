import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// import Axios from 'axios';
import defaultImage from './default.png';
import { Grid } from '@material-ui/core';

const BoardItems=props=> {
    console.log(props);
    return ( 
        <Grid xs={12} md={4}>
            <Link to={`/home/board/item/${props.row.board_no}`}>
                <div className="BoardItem">
                    {/* <div>{props.row.board_no}</div> 일단 가리겠음 */}
                    <Grid xs={6} md={6}> <div>{props.row.subject}</div></Grid>
                     <Grid xs={6} md={6}><div style={{textAlign:'right'}}>{props.row.writeday}</div></Grid>
                    <div>{props.row.readcount}</div>
                    <div>{props.row.content}</div>
                    <div>{props.row.requirepoint}
                        <img src={defaultImage} className="BoardProImage" alt=''/>
                        <span>{props.row.writer}</span>
                    </div>
                    
                </div>
            </Link>
        </Grid>
    );
}
 
export default BoardItems;