import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router';
import Axios from 'axios';

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
    const [ip,setIp]=useState('');
    
    var rte='';
    const imagearray=[
        "사자.png", "여우.png", "코끼리.png", "코알라.png", "팬더.png", "호랑이.png"
    ]

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
    return ( 
        <div>
            제목 : {item.subject}<br/>
            설명 : {item.content}<br/>
            조회수 : {item.readcount}<br/>
            포인트 : {item.requirepoint}<br/>
            작성일 : {item.writeday}<br/>
            작성자 : {item.name}<br/>
            작성자 프로필 사진 : 
            <img src={item.profile.substring(0,4)!="http"?ip+rte+item.profile:item.profile} className="BoardProImage" alt=''/><br/><br/>
            문제 : 
            {
                carddata.map((row,index) => (
                    <div>
                        <p>인덱스 : {index}</p>
                        <p>문제 : {row.question}</p>
                        <p>답 : {row.answer}</p>
                        {
                            row.imgFile!==""?<img src={ip+"/bcard/img/"+row.imgFile} style={{width:"300px",height:"300px"}} />:<></>
                        }
                    </div>
                ))
            }
            <br/>
            <button type="button" onClick={golist}>리스트</button>
            <button type="button" >수정</button>
            <button type="button" onClick={deleteboard}>삭제</button>
        </div>
    );
}
 
export default BoardItem;