import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const BoardItem=({match})=> {
    console.log(match.params.board_no);

    const [item, setItem] = useState({
        board_no : '',
        content : '',
        readcount : '',
        requirepoint : '',
        subject : '',
        writeday : '',
        writer : ''
    });
    const board_no = match.params.board_no;

    

    useEffect(()=>{
        const getData1 = async () => {
            try {
                const data = await Axios.get(
                    "http://localhost:9000/board/getdata?board_no="+board_no
                )
                let board = data.data
                board.map((data)=>{
                    setItem({
                        board_no : data.board_no,
                        content : data.content,
                        readcount : data.readcount,
                        requirepoint : data.requirepoint,
                        subject : data.subject,
                        writeday : data.writeday,
                        writer : data.writer
                    })
                });
            } catch (e) {
                console.log(e);
            }
        }
        const updateReadcount = async () => {
            try {
                const data = await Axios.get(
                    "http://localhost:9000/board/updateReadcount?board_no="+board_no
                )
            } catch (e) {
                console.log(e);
            }
        }
        updateReadcount();
        getData1();
    },[])

    return ( 
        <div>
            제목 : {item.subject}
            내용 : {item.content}
            문제 : 
        </div>
    );
}
 
export default BoardItem;