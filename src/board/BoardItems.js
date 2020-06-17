import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// import Axios from 'axios';
import { Grid } from '@material-ui/core';
import Axios from 'axios';

const BoardItems=props=> {
    console.log(props);
    const [ip,setIp]=useState('');
    const rte='';
    if(props.row.profile.substring(0,4)!="http"){
        console.log(props.row.profile.substring(0,4));
    }

    useEffect(()=>{
        const getIp = async () =>{
            try {
                const gip = await Axios.get(
                    "http://localhost:9000/board/getIp"
                )
                setIp(gip.data);
            } catch (e) {
                console.log(e);
            }
        }
        getIp();
    },[]);
    return ( 
        <Grid xs={12} md={4}>
            <Link to={`/home/board/item/${props.row.board_no}`}>
                <div className="BoardItem">
                    {/* <div>{props.row.board_no}</div> 일단 가리겠음 */}
                    <Grid xs={6} md={6}> <div>{props.row.subject}</div></Grid>
                    <Grid xs={6} md={6}><div style={{textAlign:'right'}}>{props.row.writeday}</div></Grid>
                    <div>{props.row.readcount}</div>
                    <div>{props.row.content}</div>
                    <div>
                        {props.row.requirepoint}
                        <img src={props.row.provider=="default"?ip+"profile/default/"+props.row.profile:props.row.profile} className="BoardProImage" alt=''/>
                        <span>{props.row.name}</span>
                    </div>
                    
                </div>
            </Link>
        </Grid>
    );
}
 
export default BoardItems;