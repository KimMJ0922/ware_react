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
                img : '',
                imgSrc : '',
                searchText : ''
            }
        ]
    );
    
    const [openScope, setOpenScope] = useState('public');
    const [openPassword, setOpenPassword] = useState('');
    const [openPasswordVisible, setOpenPasswordVisible] = useState(false);

    const [updateScope, setUpdateScope] = useState('private');
    const [updatePassword, setUpdatePassword] = useState('');
    const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false);

    const [searchImgList, setSearchImgList] = useState([]);
    const [resdata, setResdata] =useState([]);
    const [rowId, setRowId] = useState(0);
    const testimg=[
        // "/iu04.jpg",
        // "/hung.png",
        // "/iu04.jpg",
        // "/hung.png",
        // "/iu04.jpg",
        // "/hung.png",
        // "/iu04.jpg",
        // "/hung.png",
        // "/iu04.jpg",
        // "/hung.png",
        // "/iu04.jpg",
        // "/hung.png",
        // "/iu04.jpg",
        // "/hung.png"
        
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
            img : '',
            imgSrc : '',
            searchText : ''
        };
        setRows(rows.concat(data));
        setNum(num+1);

        console.log(rows);
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
                //보이기 -> 안보이기로 했을 때
                if(row["visible"] === true){
                    row["visible"] = !row["visible"];
                    //이미지 div에 있는 데이터 초기화
                    row["img"] = '';
                    row["imgSrc"] = '';
                    row["searchText"] = '';

                    let tempList = searchImgList.filter((item) => {
                        return item.id !== id;
                    });

                    setSearchImgList([...tempList]);
                    console.log(searchImgList);
                }else{
                    row["visible"] = !row["visible"];
                }             
                
            }
        });
        setRows([...rows]);

        console.log(rows);
    }

    //비밀번호 설정 선택시 보이기
    const passwordVisible = (e) => {
        if(e.target.id==="openScope"){
            //공개 범위 저장
            setOpenScope(e.target.value);

            //공개 범위가 비밀번호 아는 사람이면
            if(e.target.value==="member"){
                setOpenPasswordVisible(!openPasswordVisible);
                setOpenPassword('');
            }else{
                setOpenPasswordVisible(!openPasswordVisible);
                setOpenPassword('');
            }
        }else{
            //수정 범위 저장
            setUpdateScope(e.target.value);

            //수정 범위가 비밀번호 아는 사람이면
            if(e.target.value==="member"){
                setUpdatePasswordVisible(!updatePasswordVisible);
                setUpdatePassword('');
            }else{
                setUpdatePasswordVisible(!updatePasswordVisible);
                setUpdatePassword('');
            }
        }

        console.log(openScope,updateScope);
    }

    //비밀번호 입력시 변수에 넣기
    const changePassword = (e) => {
        let id = e.target.id;

        if(id === "openPassword"){
            setOpenPassword(e.target.value);
        }else{
            setUpdatePassword(e.target.value);
        }
    }

    //검색 텍스트 바꾸기
    const changeSearchText = (rowNum) => (e) => {
        rows.map((row,idx) => {
            if(rowNum === row.id){
                row["searchText"] = e.target.value
            }
        });

        setRowId([...rows]);
    }

    //문제 이미지 추가
    const changeFile = (id) => (e) =>{
        if(e.target.value.length===0){
            return false;
        }
        
        const uploadFile = e.target.files[0];
        const filename = e.target.files[0].name;
        const maxSize = 5 * 1024 * 1024 //5mb

        //사이즈 제한
        if(e.target.files[0].size>maxSize){
            alert("5MB까지 가능합니다.");
            return false;
        }

        //파일 확장자 추출
        let fileExtension = filename.substring(filename.lastIndexOf('.'),filename.length);
        fileExtension = fileExtension.toUpperCase();
        
        let passExtension = ['.JPG','.PNG','JPEG','.GIF'];
        
        //이미지 파일이 아니면 빠꾸
        if(passExtension.indexOf(fileExtension) === -1){
            alert("사진 파일만 업로드 가능합니다.");
            return false;
        }

        //폼 생성 후 비동기 통신
        const profile = new FormData();
        profile.append('uploadFile',uploadFile);
        profile.append('no',window.sessionStorage.getItem('no'));
        axios(
            {
                method : 'post',
                data : profile,
                url : "http://localhost:9000/uploadquestionimgupload",
                headers : {'Content-Type' : 'multipart/form-data'}
            }
        ).then(
            (res) => {
                //이미지 파일 이름 저장
                const tempRows = rows.map(row => {
                    if (row.id === id) {
                        row["imgSrc"] = res.data.imgSrc;
                        row["img"] = res.data.img;
                    }
                    return row;
                });
                //map을 다시 돌리기 위해 setter에 저장
                setRows([...rows]);

            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );

        console.log(rows);
    }

    //submit 버튼 클릭 시
    const onSubmit = (e) => {
        e.preventDefault();
        if(title.length === 0){
            alert("제목을 입력해주세요");
            return false;
        }

        if(comment.length === 0){
            alert("설명을 작성해주세요");
            return false;
        }

        if(openPasswordVisible === true && openPassword.length === 0){
            alert("공개 비밀번호를 입력해주세요");
            return false;
        }

        if(updatePasswordVisible === true && updatePassword.length === 0){
            alert("수정 비밀번호를 입력해주세요");
            return false;
        }
        let check = true;
        rows.map((data,idx) => {
            if(data.id === 1){
                if(data.question.length === 0 || data.answer.length === 0){
                    alert("첫번째 문제는 필수로 입력해야합니다.");
                    return check = false;
                }
            }else{
                if(data.question.length === 0 || data.answer.length === 0){
                    alert("문제와 답을 작성해주세요");
                    return check = false;
                }
            }
        })

        if(check === false){
            return false;
        }

        let url = "http://localhost:9000/insert";
        axios.post(url,
            {
                no : window.sessionStorage.getItem('no'),
                rows,
                title,
                comment,
                openPassword,
                updatePassword,
                openScope,
                updateScope
            }
        ).then((res)=>{
            console.log(rows);
        }).catch((error)=>{
            console.log("error"+error);
        });
    }

    const searchImg = (e) => {
        let num = parseInt(e.target.name);
        let search = '';
        setRowId(num);
        rows.map((row,idx)=>{
            if(row.id === num){
                search = row.searchText;
                
            }
        });

        if(search.length === 0){
            return false;
        }

        let tempList = searchImgList.filter((item) => {
            return item.id !== num;
        });
        setSearchImgList([...tempList]);

        //검색한 이미지 목록 가져오기
        let url = "http://localhost:9000/searchimg";
        axios.post(url,{
            search
        }).then((res) => {
            let src = res.data.list
            if(src.length !== 0){
                setResdata(src);

            }
        }).catch((err) => {

        });
    }

    //검색한 이미지 목록을 임시 배열에 저장 후 
    //useEffect로 실제 사용할 배열에 넣어야 바로바로 적용 됨.
    useEffect(()=>{
        resdata.map((src) => {
            if(rowId !== 0){
                searchImgList.push({id : rowId,src});
            }
        });
        setRows([...rows]);
    },[resdata]);

    //검색한 이미지 클릭시
    const searchImgClick = (id) => (e) => {
        let src = e.target.src;

        console.log(id);
        let url = "http://localhost:9000/searchimgclick";
        axios.post(url,{
            no : window.sessionStorage.getItem('no'),
            src
        }).then((res) => {
            console.log(res);
            //복사한 파일명, 경로 넣기
            rows.map((row) => {
                if(row.id === id){
                    row["imgSrc"] = res.data.imgSrc;
                    row["img"] = res.data.img;
                    return row;
                }
            });
            setRows([...rows]);
        }).catch((err) => {

        });
        //setRows([...rows]);
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
                            <option value="member">비밀번호를 아는 사람</option>
                            <option value="private">나만</option>
                        </select><br/>
                        {/* 공개 비밀번호 */}
                        <input type="password" id="openPassword" name="openPassword" style={{visibility : openPasswordVisible?"visible":"hidden"} }
                               onChange={changePassword}/>
                        
                    </Grid>

                    <Grid xs={6} md={6}>
                    <span className="crt_input_font web">수정</span><br/>
                        <select id="updateScope" onChange={passwordVisible}  className="crt_slt_bar">
                            <option value="member">비밀번호를 아는 사람</option>
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
                                        </div>      
                                    </Paper>
                                    <Grid>
                                        <Paper className={row.visible? "imgPaperVisible" : "imgPaperinVisible"}>
                                            {/* 파일 */}
                                            <div class="file_add">
                                                <div>
                                                    <h3>검색</h3>
                                                    <div>
                                                        <input type="text" name="searchImg" onChange={changeSearchText(rowNum)} value={row.searchText}/>
                                                        <button type="button" onClick={searchImg} name={rowNum}>검색</button>
                                                    </div>
                                                    <label for={"ex_file"+rowNum}>직접 업로드 하기</label>
                                                    <input type="file" onChange={changeFile(row.id)} name={row.id}  id={"ex_file"+rowNum}/>
                                                </div>
                                                <div className="scroll_x">   
                                                    {/* 업로드나 선택한 이미지 */}
                                                    {
                                                        row.imgSrc !== "" &&
                                                            <img className="scroll_img" key={rowNum} src={row.imgSrc} alt=""/>
                                                    }
                                                    {/* 검색 했을 때 보이는 이미지 */}
                                                    {
                                                        searchImgList.map((item)=>{
                                                            if(item.id === rowNum){
                                                                return (
                                                                    <img className="scroll_img" src={item.src} onClick={searchImgClick(rowNum)} alt=""/>
                                                                )
                                                            }
                                                        })
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