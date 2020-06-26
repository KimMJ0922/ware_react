import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


import { Grid } from '@material-ui/core';
import Axios from 'axios';

const BoardItems=props=> {
    //console.log("index : "+props.pageNum);
    const [ip,setIp]=useState('');
    var rte='';
    const imagearray=[
        "사자.png", "여우.png", "코끼리.png", "코알라.png", "팬더.png", "호랑이.png"
    ]

    if(props.row.profile.substring(0,4)!=="http"){
        if(imagearray.indexOf(props.row.profile)===-1){
            rte="profile/users/";
        }else{
            rte="profile/default/";
        }
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
            <Link to={`/home/board/item/${props.row.board_no}/${props.pageNum}/${props.row.no}`}>
                <div className="BoardItem">
                    <Grid container>
                    <Grid xs={6} md={6}> <div className="BoardItemSubject">{props.row.subject}</div></Grid>
                     <Grid xs={6} md={6}> <div className="BoardItemWriteDay" style={{textAlign:'right'}}>{props.row.writeday}</div></Grid>
                     <Grid xs={6} md={6}> <div className="BoardItemRequirePoint">{props.row.requirepoint}  Point</div></Grid>
                     <Grid xs={6} md={6}> <div className="BoardItemReadCount" style={{textAlign:'right'}}>{props.row.readcount}View</div></Grid>
                     <Grid xs={12} md={12}> <div className="BoardItemContent">{props.row.content}</div></Grid>
                     <Grid xs={2} md={3}> <img src={props.row.profile.substring(0,4)!="http"?ip+rte+props.row.profile:props.row.profile} className="BoardProImage" alt=''/></Grid>
                     <Grid xs={10} md={9}>   <div className="BoardItemWriter">{props.row.name}</div></Grid>
                    </Grid>
                </div>
            </Link>
        </Grid>
    );
    
}
 
export default BoardItems;
