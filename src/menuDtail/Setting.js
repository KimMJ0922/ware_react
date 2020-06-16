import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Setting.css';

const Setting = () => {
    const [provider, setProvider] = useState(window.sessionStorage.getItem('provider'));
    const [newName, setNewName] = useState(window.sessionStorage.getItem('name'));
    const [fileName, setFileName] = useState('');
    const [defaultImg, setDefaultImg] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [outText, setOutText] = useState('');

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

        defaultProfileImg();
    },[])

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
        let fileExtension = filename.substring(filename.lastIndexOf('.'),filename.length);
        fileExtension = fileExtension.toUpperCase();
        
        let passExtension = ['.JPG','.PNG','JPEG','.GIF'];
        if(passExtension.indexOf(fileExtension) === -1){
            alert("사진 파일만 업로드 가능합니다.");
            return false;
        }
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
        ).then(
            (res) => {
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
                window.location.reload();
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );
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
            window.location.reload();
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
            window.location.reload();
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
            alert("변경되었습니다.");
            window.location.reload();
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
            window.location.reload();
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
                   window.location.replace('/');
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
        <div>
            <div>
                <div>
                    <h2>프로필 이미지 변경</h2>
                    <h3>파일은 이미지 파일만 가능하며 5MB까지 가능합니다.</h3>
                    <input type="file" onChange={profileImg}></input>
                </div>
                <div>
                    { provider !== "default" &&
                        <img src={window.sessionStorage.getItem('socialProfile')} alt="" 
                             onClick={socialProfileImgClick} className="profileImgList"/>
                    }
                    {
                        defaultImg.map((data,idx)=>{
                            return <img src={data} alt="" key={idx}
                                        onClick={profileImgClick} className="profileImgList"/>
                        })
                   }
                </div>
            </div>
            <div>
                <h2>이름 변경</h2>
                <input type="text" id="name" name="name" onChange={changeName} value={newName}/>
                <button type="button" onClick={nameChangeButton}>변경</button>
            </div>
            {
                provider === "default" &&
                <div>
                    <h2>비밀번호 변경 </h2>
                    <input type="password" id="password" name="password" placeholder="●●●●●●●"
                           onChange={changePassword} value={newPassword}/>
                    <button type="button" onClick={passwordChangeButton}>변경</button>
                </div>
            }
            <div>
                <h2>회원 탈퇴</h2>
                
                <h3>
                    회원 탈퇴 시, 해당 계정의 정보는 모두 지워집니다.<br/>
                    회원 탈퇴를 원하시면 "<font style={{color:'red'}}>회원탈퇴</font>"라고 작성 후 버튼을 눌러주세요.
                </h3>
                
                <input type="text" name="out" placeholder="회원탈퇴" onChange={changeOutText}/>
                <button type="button" onClick={signOut}>회원 탈퇴</button>
            </div>
        </div>
    )
}
export default Setting;