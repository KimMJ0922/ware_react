import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';
import defaultImage from './default.png';

const BoardItems=props=> {
    console.log(props);
    return ( 
        <Link to={`/board/item/${props.row.board_no}`}>
            <div className="BoardItem">
                <span style={{width:"5%"}}>{props.row.board_no}</span>
                <img src={defaultImage} className="BoardProImage"></img>
                <span style={{width:"20%"}}>{props.row.writer}</span>
                <span style={{width:"45%"}}>{props.row.subject}</span>
                <span style={{width:"10%"}}>{props.row.readcount}</span>
                <span style={{width:"15%"}}>{props.row.writeday}</span>
            </div>
        </Link>
    );
}
 
export default BoardItems;