import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BoardInsert=()=> {
    const [num, setNum] = useState(2);
    const [title, setTitle] = useState('');
    const [comment,setComment] = useState('');
    const [rows,setRows] = useState(
        [
            {
                id: 1,
                question: '',
                answer:'',
                visible : false,
                img : ''
            }
        ]
    );

    //제목, 설명 텍스트 저장
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeComment = (e) => {
        setComment(e.target.value)
    }
    
    // 추가
    const addRow = () => {
        let data = {        
            id: num,
            question: '',
            answer:'',
            visible : false,
            img : ''
        };
        setRows(rows.concat(data));
        setNum(num+1);
    };

    //텍스트 입력
    //텍스트 입력시 배열중 아이디가 일치하는 곳에 텍스트 저장
    const inputChange = (id) => (e) =>{
        const {
            target : {value}
        } = e;

        const tempRows = rows.map(row => {
            if (row.id === id) {
              row[e.target.name] = value;
            }
            return row;
          });
          setRows(tempRows);
    }

    //삭제
    //filter를 이용해 해당 아이디가 일치하는 값을 제외하고
    //불일치 하는 값을 가지고 새 배열을 만듬.
    const deleteRow = (id) => () => {
        console.log(id);
        if(rows.length>2){
            let tempRows = rows.filter(row => {
            return row.id !== id ;
            });
            setRows(tempRows);
        }else{
            alert("삭제 불가");
        }
    };


    //이미지 div 보이기
    //해당 아이디가 일치하는 visible속성을 토글 방식으로 바꿈
    //마지막에 변화한 것을 setter에 주입해야 useEffect 인식됨.
    //setter에 안넣으면 다음 행동 했을 때 변화함
    const changeDisplay = (id) => (e) => {
       rows.map(row => {
            if(row.id === id){             
                row["visible"] = !row["visible"];
            }
        });
        setRows([...rows]);
    }

    const changeFile = (id) => (e) =>{
        if(e.target.value.length===0){
            return false;
        }
        let files = e.target.files[0];
        let fileName = e.target.files[0].name;
        //이미지 파일 이름 저장
        const tempRows = rows.map(row => {
            if (row.id === id) {
                row["img"] = fileName;
            }
            return row;
        });
        setRows(tempRows);
    }

    //submit 버튼 클릭 시
    const onSubmit = (e) => {
        console.log("1");
        e.preventDefault();
        let url = "http://localhost:9000/bminsert";
        axios.post(url,
            {
                rows,
                title,
                comment
            }
        ).then((res)=>{
            console.log(rows);
        }).catch((error)=>{
            console.log("error"+error);
        });
    }
    return ( 
        <div className="board">
            <form onSubmit={onSubmit}>
                {/* 제목, 설명 */}
                <div className="InsertTitle">
                    <label for="title">제목</label><br/>
                    <input type="text" name="title" id="title" className="title" placeholder="제목을 입력하세요." onChange={changeTitle}/><br/>
                    <label for="comment">설명</label><br/>
                    <input type="text" name="comment" id="comment" className="title" placeholder="설명을 입력하세요." onChange={changeComment}/>
                </div>
                <div style={{width:'800px',height:'auto',border:'2px solid black',marginBottom:'20px'}}>
                    {
                        rows.map((row,i)=>{
                            let rowNum = row.id;
                            return (
                                <div key={i} className="card">
                                    {/* 번호 */}
                                    <div className="cardMenu">
                                        {i+1}
                                        <button type="button" onClick={deleteRow(rowNum)}>삭제</button>
                                    </div>
                                    {/* 문제, 답, 이미지 */}
                                    <div className="cardInfo">
                                        <div className="que">
                                            <input type="text" className="inputTag" name="question" onChange={inputChange(rowNum)} value={row.question}/><br/>
                                            <span>문제</span>
                                        </div>
                                        <div className="que">
                                            <input type="text" className="inputTag" name="answer" onChange={inputChange(rowNum)} value={row.answer}/><br/>
                                            <span>답</span>
                                        </div>
                                        <div className="que">
                                            <button type="button" className="btn btn-info" onClick={changeDisplay(rowNum)}>이미지 추가</button>
                                        </div>
                                    </div>
                                    {/* 이미지 */}
                                    <div className={row.visible? "imgDivVisible" : "imgDivInVisible"}>
                                        <div>

                                        </div>
                                        {/* 파일 */}
                                        <div>
                                            <input type="file" name="imgFile" onChange={changeFile(rowNum)}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <br/>
                    <button type="button" onClick={addRow} className="btn btn-info addBtn">추가</button>
                </div>
                <div>
                    <button type="submit" className="btn btn-success" >만들기</button>
                </div>
            </form>
        </div>
    );
}
 
export default BoardInsert;