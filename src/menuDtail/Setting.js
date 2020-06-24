import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router'
import './Setting.css';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ReportIcon from '@material-ui/icons/Report';
import { Grid, Paper } from '@material-ui/core';

const Setting = (props) => {
    var rou= useHistory();
    const [provider, setProvider] = useState(window.sessionStorage.getItem('provider'));
    const [newName, setNewName] = useState(window.sessionStorage.getItem('name'));
    const [fileName, setFileName] = useState('');
    const [defaultImg, setDefaultImg] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [outText, setOutText] = useState('');
    const [history, setHistory] = useState([]);

    //이름을 입력했을 때
    const changeName = (e) => {
        setNewName(e.target.value);
    }

    //페이지 불러왔을 때 
    useEffect(()=>{
        //이미지 목록 가져오기
        const defaultProfileImg = async() => {
            let url = "http://localhost:9000/defaultProfileImg";
            try{
                let list = await axios.post(url,{no : window.sessionStorage.getItem('no')});
                let listData = list.data;
                setDefaultImg(listData);
            }catch(e){
                console.log(e);
            }
        }

        const point_history = async () =>{
            try {
            } catch (e) {
                console.log(e);
            }
        }

        defaultProfileImg();
    },[]);

    //프로필 이미지 직접 올리기
    const profileImg = (e) => {
        const uploadFile = e.target.files[0];
        const filename = e.target.files[0].name;
        const maxSize = 5 * 1024 * 1024 //5mb
        setFileName(filename);
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
        profile.append('email',window.sessionStorage.getItem('email'));
        axios(
            {
                method : 'post',
                data : profile,
                url : "http://localhost:9000/uploadProfileImg",
                headers : {'Content-Type' : 'multipart/form-data'}
            }
        ).then((res) => {
            window.sessionStorage.setItem('profile',''); 
            props.setProfile('');
            //자동 로그인 설정이 되어있으면 로컬스토리지 값 변경
            let auto = localStorage.getItem('autoLogin');
            if(auto !== null){
                localStorage.setItem(
                    "autoLogin",
                    JSON.stringify({
                        no : window.sessionStorage.getItem('no'),
                        email: window.sessionStorage.getItem('email'),
                        name : window.sessionStorage.getItem('name'),
                        profile : window.sessionStorage.getItem(res.data)
                    })
                );
            }
            window.sessionStorage.setItem('profile',res.data); 
            props.setProfile(res.data); 
        }).catch((error)=>{
            console.log(error);
        });
    }

    //프로필 이미지 선택시
    const profileImgClick = (e) => {
        let profile = e.target.src;
        let url = "http://localhost:9000/updateProfileImg"
        axios.post(url,{
            profile,
            no : window.sessionStorage.getItem('no'),
            email : window.sessionStorage.getItem('email')
        }).then((res)=>{
            window.sessionStorage.setItem('profile',profile);
            props.setProfile(profile);
        }).catch((err)=>{
            
        })

    }

    //소셜에서 가져온 이미지 클릭시
    const socialProfileImgClick = (e) => {
        let profile = e.target.src;
        let url = "http://localhost:9000/updatesocialprofileimg"
        axios.post(url,{
            profile,
            no : window.sessionStorage.getItem('no'),
            email : window.sessionStorage.getItem('email')
        }).then((res)=>{
            window.sessionStorage.setItem('profile',profile);
            props.setProfile(profile);
            //rou.replace(rou.go(0));
            //window.location.reload();
        }).catch((err)=>{
            
        })
    }

    //이름 변경 버튼 눌렀을 때
    const nameChangeButton = () => {
        let RegExp = /^[가-힣a-zA-Z0-9_]+$/;

        //변경 전 이름과 후 이름이 같을 때
        if(newName===window.sessionStorage.getItem('name')){
            return false;
        }
        
        //정규식에 안맞을 때
        if(!RegExp.test(newName)){
            alert("이름의 2~10자로 형식은 한글, 영문 대,소문자, 숫자, 언더바(_)만 사용 가능합니다.");
            return false;
        }

        //2~10자가 아닐 때
        if(newName.length > 10 || newName.length <2){
            alert("이름의 2~10자로 형식은 한글, 영문 대,소문자, 숫자, 언더바(_)만 사용 가능합니다.");
            return false;
        }

        let url = "http://localhost:9000/nameoverlap"
        axios.post(url,{
            provider,
            name : newName
        }).then((res) => {
            console.log(res.data.check);
            if(res.data.check){
                alert("중복된 이름입니다.");
            }else{
                nameUpdate();
            }
        }).catch((err) => {

        })
    }

    //이름 업데이트
    const nameUpdate = () => {
        let url = "http://localhost:9000/nameupdate";
        axios.post(url,{
            no : window.sessionStorage.getItem('no'),
            name : newName
        }).then((res) => {
            window.sessionStorage.setItem('name',newName);
            
            //자동 로그인 업데이트
            let auto = localStorage.getItem('autoLogin');
            if(auto !== null){
                localStorage.setItem(
                    "autoLogin",
                    JSON.stringify({
                        no : window.sessionStorage.getItem('no'),
                        email: window.sessionStorage.getItem('email'),
                        name : window.sessionStorage.getItem('name'),
                        profile : window.sessionStorage.getItem(res.data)
                    })
                );
            }
            //alert("변경되었습니다.");
            props.setName(newName);
        }).catch((err) => {

        })
    }

    //비밀번호 입력
    const changePassword = (e) => {
        setNewPassword(e.target.value)
    }
    
    //비밀번호 변경 버튼 눌렀을 때
    const passwordChangeButton = () => {
        if(newPassword.length === 0){
            alert("비밀번호를 입력해주세요");
            return false;
        }

        if(newPassword.length>20 || newPassword.length<6){
            alert("비밀번호는 6~20자로 작성해주세요");
            return false;
        }
        let url = "http://localhost:9000/passwordupdate"
        axios.post(url,{
            no : window.sessionStorage.getItem('no'),
            password : newPassword
        }).then((res) => {
            alert("변경되었습니다.");
            rou.replace(rou.push())
            //window.location.reload();
        }).catch((err) => {

        });
    }

    const changeOutText = (e) =>{
        setOutText(e.target.value);
    }

    //회원탈퇴
    const signOut = () => {
        let text = outText;

        if(text === "회원탈퇴"){
            let check = window.confirm("회원탈퇴를 하시겠습니까?");
            if(check){
                let url = "http://localhost:9000/deletemember"
                axios.post(url,{
                    no : window.sessionStorage.getItem('no')
                }).then((res) => {
                   window.sessionStorage.clear();
                   rou.replace('/');
                }).catch((err) => {

                });
            }else{
                return false;
            }
        }else{
            alert("다시 작성해주세요");
        }
    }

    return(
        <>
        <div className="set_body">
            {/* 프로필 이미지 변경 */}
        <Grid container>
            <Grid item xs={12} md={4}>
            <p className="set_top_font1">프로필 이미지 변경</p>              
                <Paper className="set_prof_box_top">
                    { 
                        provider !== "default" &&                      
                        <img src={window.sessionStorage.getItem('profile')} alt=""
                         onClick={socialProfileImgClick} className="set_befor_img"/>                                  
                    }
                     <p className="set_top_font2">현재 프로필</p>
                     </Paper>             
            </Grid>
            <Grid itme xs={12} md={8}>
            <p className="set_title_font">프로필 이미지 고르기</p>
                <Paper className="set_prof_box_mid">
                { 
                        provider !== "default" &&                      
                        <img src={window.sessionStorage.getItem('socialProfile')} alt=""
                         onClick={socialProfileImgClick} className="set_basic_img"/>                                  
                }
                {
                        defaultImg.map((data,idx)=>{
                            return <img src={data} alt="" key={idx}
                                        onClick={profileImgClick} className="set_basic_img"/>
                        })
                    }
                    <div className="set_file_box">
                    <label for="set_file">직접 업로드</label>
                    <input type="file" onChange={profileImg} id="set_file" className="set_file_input"/>
                    </div>
                    <p className="set_mid_font2">이미지 파일만 가능하며 5MB까지 가능합니다</p>
                    </Paper>
            </Grid>
        </Grid>
            {/* 프로필 이미지 변경 끝 */}

            <Grid container>
                <Grid item xs={12} md={4}>
                <p className="set_title_font3">이름 변경</p>
                    <div className="set_icon_box_1">
                        <HowToRegIcon/>
                    </div> 
                </Grid>
                <Grid item xs={12} md={8}>
                     <input type="text" id="name" name="name" className="set_name_input" onChange={changeName} value={newName}/>
                    <button type="button" onClick={nameChangeButton} className="set_name_btn">변경</button>             
                </Grid>  
            </Grid>  
                            
                {
                    provider === "default" &&
                    <div>
                        <h2>비밀번호 변경 </h2>
                        <input type="password" id="password" name="password" placeholder="●●●●●●●"
                            onChange={changePassword} value={newPassword}/>
                        <button type="button" onClick={passwordChangeButton}>변경</button>
                    </div>
                }
              <Grid container>
                <Grid item xs={12} md={4}>
                <p className="set_title_font3">회원 탈퇴</p>
                    <div className="set_icon_box">
                        <ReportIcon/>
                    </div>                     
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper className="set_exit_text_box">
                        <p>회원 탈퇴 시 </p>
                        <p>해당 계정의 정보는 모두 지워집니다.</p>
                        <p> 회원 탈퇴를 원하시면</p>
                        <p><font style={{color:'red'}}>" 회원탈퇴 "</font></p>
                        <p>를 작성 후 버튼을 눌러주세요.</p>
                        <input type="text" name="out" placeholder="텍스트를 입력하세요" className="set_exit_input" onChange={changeOutText}/>  
                        <button type="button" onClick={signOut} className="set_exit_btn">회원 탈퇴</button>
                    </Paper>                  
                </Grid>

              </Grid> 
            <Grid item xs={12} md={12}>
                <p className="set_title_font3" style={{"text-align":"left"}}>포인트 내역</p>
                <Paper>

                </Paper>
            </Grid>
            </div>
        </>
    )
}
export default Setting;