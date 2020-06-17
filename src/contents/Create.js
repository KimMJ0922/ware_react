import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import './Create.css';
import { Paper } from '@material-ui/core';
import DelIcon from '@material-ui/icons/DeleteForever';
import ImgIcon from '@material-ui/icons/ImageSearch';
const CreateCardSet = () => {
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
    
    const [openPassword, setOpenPassword] = useState('');
    const [openPasswordVisible, setOpenPasswordVisible] = useState(false);

    const [updatePassword, setUpdatePassword] = useState('');
    const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false);
    
    const testimg=[
        "/iu04.jpg",
        "/hung.png",
        "/iu04.jpg",
        "/hung.png",
        "/iu04.jpg",
        "/hung.png",
        "/iu04.jpg",
        "/hung.png",
        "/iu04.jpg",
        "/hung.png",
        "/iu04.jpg",
        "/hung.png",
        "/iu04.jpg",
        "/hung.png"
        
    ];

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
        if(rows.length>1){
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

    //비밀번호 설정 선택시 보이기
    const passwordVisible = (e) => {
        if(e.target.id==="openScope"){
            if(e.target.value==="password"){
                setOpenPasswordVisible(!openPasswordVisible);
                setOpenPassword('');
            }else{
                setOpenPasswordVisible(!openPasswordVisible);
                setOpenPassword('');
            }
        }else{
            if(e.target.value==="password"){
                setUpdatePasswordVisible(!updatePasswordVisible);
                setUpdatePassword('');
            }else{
                setUpdatePasswordVisible(!updatePasswordVisible);
                setUpdatePassword('');
            }
        }
    }

    //비밀번호 입력시 변수에 넣기
    const changePassword = (e) => {
        let id = e.target.id;

        if(id === "openPassword"){
            setOpenPassword(e.target.value);
        }else{
            setUpdatePassword(e.target.value);
        }

        console.log(e.target.value);
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
        e.preventDefault();
        let url = "http://localhost:9000/insert";
        axios.post(url,
            {
                rows,
                title,
                comment,
                openPassword,
                updatePassword
            }
        ).then((res)=>{
            console.log(rows);
        }).catch((error)=>{
            console.log("error"+error);
        });
    }

    return(
        <div className="crt_body">
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid container style={{marginBottom:'50px'}}>
                        <Grid xs={6} md={10}>
                            <div class="crt_top">세트 만들기</div>
                        </Grid>
                        <Grid xs={6} md={2}>
                            <button type="button" className="create_btn1" >만들기</button>
                        </Grid>
                    </Grid>
                {/* 제목, 설명 */}
                <Grid xs={12} md={12}>
                <div className="crt_top_input_box">
                    <label for="title" className="crt_input_font">제목</label><br/>
                    <input type="text" name="title" id="title" className="crt_title inputTop" placeholder="제목을 입력하세요." onChange={changeTitle}/><br/>
                    <label for="comment" className="crt_input_font">설명</label><br/>
                    <input type="text" name="comment" id="comment" className="crt_title inputTop" placeholder="설명을 입력하세요." onChange={changeComment}/><br/>
                    
                </div>
                </Grid>
                {/* 공개범위 */}
                
                    <Grid xs={6} md={6}>
                       
                        <span className="crt_input_font web">공개</span><br/>
                        <select id="openScope" onChange={passwordVisible} className="crt_slt_bar">
                            <option value="public" selected>모두</option>
                            <option value="password">비밀번호를 아는 사람</option>
                            <option value="private">나만</option>
                        </select><br/>
                        {/* 공개 비밀번호 */}
                        <input type="password" id="openPassword" name="openPassword" style={{visibility : openPasswordVisible?"visible":"hidden"} }
                               onChange={changePassword}/>
                        
                    </Grid>

                    <Grid xs={6} md={6}>
                    <span className="crt_input_font web">수정</span><br/>
                        <select id="updateScope" onChange={passwordVisible}  className="crt_slt_bar">
                            <option value="password">비밀번호를 아는 사람</option>
                            <option value="private" selected>나만</option>
                        </select><br/>
                        {/* 수정 비밀번호 */}
                        <input type="password" id="updatePassword" name="updatePassword" style={{visibility : updatePasswordVisible?"visible":"hidden"}}
                               onChange={changePassword}/>
                    </Grid>
               
               
                    {
                        rows.map((row,i)=>{
                            let rowNum = row.id;
                            return (
                                <Grid xs={12} md={12}>
                                <Paper className="crt_add_content_paper">
                                <div key={i} className="card">
                                    {/* 번호 */}
                                    
                                    <span className="crt_input_font2">{i+1}번 카드</span>
                                    <DelIcon onClick={deleteRow(rowNum)}/>
                                    
                                    {/* 문제, 답, 이미지 */}
                                    
                                        <Grid container>
                                        <Grid xs={9} md={9}>
                                            <Grid item xs={12} md={12}>
                                            <input type="text" className="crt_slt_mun" name="question" onChange={inputChange(rowNum)} value={row.question} placeholder="문제를 입력하세요"/><br/>
                                            <span className="crt_input_font">문제</span>
                                            </Grid>
                                            
                                            <Grid item xs={12} md={12}>
                                            <input type="text" className="crt_slt_mun" name="answer" onChange={inputChange(rowNum)} value={row.answer}  placeholder="답을 입력하세요"/><br/>
                                            <span className="crt_input_font">답</span>
                                            </Grid>
                                            </Grid>
                                            <Grid item xs={3} md={3}>
                                                <ImgIcon style={{fontSize:'4.5rem'}} onClick={changeDisplay(rowNum)}/>
                                                <p><span className="crt_input_font3">이미지 등록</span></p>
                                            </Grid>
                                        </Grid>
                                         {/* 이미지 */}
                                    </div>      
                                </Paper>
                                <Grid>
                                    <Paper className={row.visible? "imgPaperVisible" : "imgPaperinVisible"}>
                                        {/* 파일 */}
                                        <div class="file_add">
                                            <div>
                                                <h3>검색</h3>
                                                <input type="text" name="searchImg"/>
                                                <label for="ex_file">직접 업로드 하기</label>
                                                <input type="file" onChange={changeFile(rowNum)} name="imgFile"  id="ex_file"/>
                                            </div>
                                            <div className="scroll_x">
                                                {
                                                    testimg.map(src => (
                                                        <img className="scroll_img" key={src} src={window.location.origin +src}  alt="경로 오류"/>
                                                    ))
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
                    <Paper className="crt_add_card_paper">
                    <button type="button" onClick={addRow} className="crt_add_card">+ 카드 추가</button>
                    </Paper>
                </Grid>
                <Grid xs={12} md={12}>
                    <div className="crt_create_btn_box">
                    <button type="submit" className="crt_create_btn" >만들기</button>
                    </div>
                </Grid>
                {/* 컨테이너 그리드 */}
                </Grid>
            </form>
        </div>
    );
}
export default CreateCardSet;