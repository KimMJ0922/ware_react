import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import DelIcon from '@material-ui/icons/DeleteForever';
import ImgIcon from '@material-ui/icons/ImageSearch';
import './Board.css';

// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

const BoardInsert2=()=> {
    const [num, setNum] = useState(2);
    const [title, setTitle] = useState('');
    const [comment,setComment] = useState('');
    const [point,setPoint] = useState('');
    const no= window.sessionStorage.getItem('no');
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

    const changePoint = (e) => {
        setPoint(e.target.value)
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
        let url = "http://localhost:9000/board/insert";
        axios.post(url,
            {
                rows,
                no,
                title,
                comment,
                point
            }
        ).then((res)=>{
            //window.location.replace("/board/item/75")
        }).catch((error)=>{
            console.log("error"+error);
        });
    }
    return ( 
        <div className="board_ist_body">
            <form onSubmit={onSubmit}>
            <Grid container>
                     <Grid container style={{marginBottom:'50px'}}>
                        <Grid xs={12} md={12}>
                            <div class="board_ist_top">장터 세트 만들기</div>
                        </Grid>
                    </Grid>
                {/* 제목, 설명 */}
                <Grid xs={12} md={12}>
                        <div className="board_ist_top_input_box">
                            <label for="title" className="board_ist_input_font">제목</label><br/>
                            <input type="text" name="title" id="title" className="board_ist_title board_input_Top" placeholder="제목을 입력하세요." onChange={changeTitle}/><br/>
                            <label for="comment" className="board_ist_input_font">설명</label><br/>
                            <input type="text" name="comment" id="comment" className="board_ist_title board_input_Top" placeholder="설명을 입력하세요." onChange={changeComment}/><br/> 
			                <label for="comment" className="board_ist_input_font">포인트</label><br/>
                            <input type="text" name="requirepoint" id="requirepoint" className="board_ist_title board_input_Top" placeholder="포인트를 입력하세요." onChange={changePoint}/>
                        </div>
                </Grid>
               
                    {
                        rows.map((row,i)=>{
                            let rowNum = row.id;
                            return (
                                <Grid xs={12} md={12}>
                                    <Paper className="board_ist_add_content_paper">
                                        <div key={i} className="card">
                                            {/* 번호 */}
                                            <span className="board_ist_input_font2">{i+1}번 카드</span>
                                            <DelIcon onClick={deleteRow(rowNum)}/>
                                            {/* 문제, 답, 이미지 */}
                                            <Grid container>
                                                <Grid xs={9} md={6}>
                                                    <Grid item xs={12} md={12}>
                                                        <input type="text" className="board_ist_slt_mun" name="question" onChange={inputChange(rowNum)} value={row.question} placeholder="문제를 입력하세요"/><br/>
                                                        <span className="board_ist_input_font">문제</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <input type="text" className="board_ist_slt_mun" name="answer" onChange={inputChange(rowNum)} value={row.answer}  placeholder="답을 입력하세요"/><br/>
                                                        <span className="board_ist_input_font">답</span>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} md={6}>
                                                    <div className="board_img_box">
                                                    <ImgIcon onClick={changeDisplay(rowNum)}/>
                                                    </div>
                                                    <p style={{textAlign:'center'}}><span className="board_ist_input_font3">이미지 등록</span></p>
                                                </Grid>
                                            </Grid>
                                        </div>      
                                    </Paper>
                                    <Grid>
                                        <Paper className={row.visible? "imgPaperVisible_b" : "imgPaperinVisible"}>
                                            {/* 파일 */}
                                            <div class="file_add" style={{width:'800px'}}>
                                                <div>
                                                    <h3>검색</h3>
                                                    <input type="text" name="searchImg"/>
                                                    <button type="button">검색</button>
                                                    <label for={"ex_file"+rowNum}>직접 업로드 하기</label>
                                                    <input type="file" onChange={changeFile(row.id)} name={row.id}  id={"ex_file"+rowNum}/>
                                                </div>
                                                <div className="scroll_x">
                                                    {
                                                        row.imgSrc !== "" &&
                                                            <img className="scroll_img" key={rowNum} src={row.imgSrc}  alt=""/>
                                                    }
                                                </div>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid> 
                            )
                        })
                    }
              <Grid xs={12} md={12}>
                    <Paper className="board_add_card_paper">
                    <button type="button" onClick={addRow} className="board_add_card">+ 추가</button>
                    </Paper>
                </Grid>

                <Grid xs={12} md={12}>
                    <div className="board_buttom_btn_box">
                      <Link to="/home/board">
                        <button type="button" className="board_btn">리스트</button>
                      </Link>
                      <button type="submit" className="board_btn">만들기</button>
                    </div>
                </Grid>
                {/* 컨테이너 그리드 */}
                </Grid>
            </form>
        </div>
        
        
    );
}
 
export default BoardInsert2;