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
        <Grid item xs={12} md={4}>
            <Link to={`/home/board/item/${props.row.board_no}`} className='BoardItemBox'>
                <div className="BoardItem">
                    {/* <div>{props.row.board_no}</div> 일단 가리겠음 */}
                    <Grid container>
                    <Grid xs={6} md={6}> <div className="BoardItemSubject">{props.row.subject}</div></Grid>
                     <Grid xs={6} md={6}> <div className="BoardItemWriteDay" style={{textAlign:'right'}}>{props.row.writeday}</div></Grid>
                     <Grid xs={6} md={6}> <div className="BoardItemRequirePoint">{props.row.requirepoint}  Point</div></Grid>
                     <Grid xs={6} md={6}> <div className="BoardItemReadCount" style={{textAlign:'right'}}>{props.row.readcount}View</div></Grid>
                     <Grid xs={12} md={12}> <div className="BoardItemContent">{props.row.content}</div></Grid>
                     <Grid xs={2} md={3}> <img src={defaultImage} className="BoardProImage" alt=''/></Grid>
                     <Grid xs={10} md={9}>   <div className="BoardItemWriter">{props.row.writer}</div></Grid>
                    
                    </Grid>
                </div>
            </Link>
        </Grid>
    );
}
 
export default BoardItems;