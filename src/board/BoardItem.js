import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router';
import Axios from 'axios';
import { Grid } from '@material-ui/core';
import { Visibility } from '@material-ui/icons'
import './Board.css';

const BoardItem=({match})=> {
    var history = useHistory();
    //console.log("pagenum : "+match.params.pageNum);
    const [item, setItem] = useState({
        board_no : '',
        content : '',
        readcount : '',
        requirepoint : '',
        subject : '',
        writeday : '',
        name : '',
        profile : ''
    });
    const [carddata, setCarddata] = useState([]);
    const board_no = match.params.board_no;
    const no = match.params.no;
    const [ip,setIp]=useState('');

    const [buyed, setBuyed] = useState(false);
    
    var rte='';
    const imagearray=[
        "사자.png", "여우.png", "코끼리.png", "코알라.png", "팬더.png", "호랑이.png"
    ]

    useEffect(()=>{
        const getBuyed = async () =>{
            try {
                const gBuyed = await Axios.post(
                    "http://localhost:9000/board/buyedcheck",{
                        board_no:board_no,
                        member_no:window.sessionStorage.getItem("no")
                    }
                )
                if(gBuyed.data===1){
                    setBuyed(true);
                }
            } catch (e) {
                console.log(e);
            }
        }

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

        const getData = async () => {
            try {
                let data = await Axios.get(
                    "http://localhost:9000/board/getdata?board_no="+board_no
                )
                let board = data.data;
                board.map((data)=>{
                    setItem({
                        board_no : data.board_no,
                        content : data.content,
                        readcount : data.readcount,
                        requirepoint : data.requirepoint,
                        subject : data.subject,
                        writeday : data.writeday,
                        name : data.name,
                        profile : data.profile
                    })
                });
            } catch (e) {
                console.log(e);
            }
        }

        const updateReadcount = async () => {
            try {
                await Axios.get(
                    "http://localhost:9000/board/updateReadcount?board_no="+board_no
                )
            } catch (e) {
                console.log(e);
            }
        }

        const getCartData = async () => {
            try {
                let data = await Axios.get(
                    "http://localhost:9000/board/boardcarddatas?board_no="+board_no
                )
                console.log(data.data);
                setCarddata(data.data);
            } catch (e) {
                console.log(e);
            }
        }

        getIp();
        updateReadcount();
        getCartData();
        setTimeout(()=>{
            getData();
            getBuyed();
        },100);
    },[])

    if(item.profile.substring(0,4)!=="http"){
        if(imagearray.indexOf(item.profile)===-1){
            rte="profile/users/";
        }else{
            rte="profile/default/";
        }
    }
    const golist = () => {
        history.push("/home/board?page="+match.params.pageNum);
        //history.goBack();
    }

    const deleteboard= async ()=>{
        try {
            await Axios.get(
                "http://localhost:9000/board/delete?board_no="+board_no
            )
            history.push("/home/board?page="+match.params.pageNum);
        } catch (e) {
            console.log(e);
        }
    }

    const update = () =>{
        history.push("/home/board/update/"+board_no);
    }

    //구매
    const buy = async () =>{
        try {
            let data = await Axios.get(
                 "http://localhost:9000/currentPoint?member_no="+window.sessionStorage.getItem("no")
            )
            console.log(data.data);
            if(data.data<item.requirepoint){
                alert("포인트 부족");
                return false;
            }
        } catch (e) {
            alert("포인트 조회 실패");
            console.log(e);
        }
        try {
            await Axios.post(
                "http://localhost:9000/board/buy",{
                    board_no: board_no,
                    member_no: window.sessionStorage.getItem("no"),
                    no:no,
                    requirepoint: item.requirepoint
                }
            )
            alert("구매 성공");
        } catch (e) {
            alert("구매 오류 다시 시도하세요");
            console.log(e);
        }
    }
    var buttons = null;
    if(window.sessionStorage.getItem("no")===no){
        console.log("작성자가 들어옴");
        buttons = 
            <div>
                <button type="button" onClick={golist}>뒤로</button>
                <button type="button" onClick={update}>수정</button>
                <button type="button" onClick={deleteboard}>삭제</button>
            </div>
    }else{
        console.log("구매자가 들어옴");
        if(buyed===true){
            buttons = 
            <div>
                <button type="button" onClick={golist}>뒤로</button>
            </div>
        }else{
            buttons = 
            <div>
                <button type="button" onClick={golist}>뒤로</button>
                <button type="button" onClick={buy}>구매하기</button>
            </div>
        }
    }
    var problems = null;
    if(window.sessionStorage.getItem("no")===no || buyed===true){
        problems = 
            carddata.map((row,index) => (
                <Grid xs={12} className='BoardStoreItemList'>
                    {/* <p><span>인덱스 : {index}</span></p> */}
                    <p style={{textAlign:'center'}}><span style={{display:'inline-block',width:'15%'}}>문제 :</span><span style={{display:'inline-block',width:'84%',fontWeight: '600'}}>{row.question}</span></p>
                    
                    {
                        row.imgFile!==""?
                        <p style={{textAlign:'center'}}><span>
                        <img src={ip+"/bcard/img/"+row.imgFile} style={{width:"300px",height:"300px",paddingLeft:'32px'}} alt=''/>
                        </span></p>
                        :
                        <></>
                    }
                    <p style={{textAlign:'center'}}><span style={{display:'inline-block',width:'15%'}}>답 :</span><span style={{display:'inline-block',width:'84%',fontWeight: '600'}}>{row.answer}</span></p>
                   
                </Grid>
            ))
    }else{
        problems = 
            <div>구매 후 문제 확인 가능합니다.</div>
    }

    return ( 
        
        <Grid container className='BoardStoreItem'>
            <Grid xs={12}className='BoardStoreSubject'>
                {item.subject}
            </Grid>
            <Grid xs={12} className='BoardStoreContent'> 
                {item.content}
            </Grid>
            <Grid xs={4} className='BoardStorePoint'> 
                {item.requirepoint}Point
            </Grid>
            <Grid xs={3}className='BoardStoreReadCount'>
               <p><Visibility color="action"/> <span>{item.readcount}</span></p>
            </Grid>
            <Grid xs={5} className='BoardStoreWriteDay'> 
                {item.writeday}
            </Grid>
            <Grid xs={12}className='BoardStoreSeller'> 
                <p><img src={item.profile.substring(0,4)!="http"?ip+rte+item.profile:item.profile} className="BoardProImage" alt=''/>
                <span>{item.name}</span></p>
            </Grid>
            {
                problems
            }
            <Grid xs={12}>
                <div className='BoardStore'>
                    {buttons}
                </div>
            </Grid>
        </Grid>
    );
}
 
export default BoardItem;