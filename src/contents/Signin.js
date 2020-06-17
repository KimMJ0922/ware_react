import React,{useState, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './content.css'
import KakaoLogin from 'react-kakao-login';
import {GoogleLogin} from'react-google-login';
import axios from 'axios';

const Signin=()=>{
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        email : '',
        password : ''
    });

    const [loginOption, setLoginOption] = useState({
        autoLogin : false,
        saveEmail : false
    });
    const [dumeCheck, setDumeCheck] = useState(false);

    //소셜 로그인 변수
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [provider, setProvider] = useState('');


    const changeLoginInfo = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name] : e.target.value
        })
    }

    //로그인 페이지가 나올 때 로컬에 저장된 정보를 가져온다.
    useEffect(() => {
        let auto = localStorage.getItem('autoLogin');
        let save = localStorage.getItem('saveEmail');
        //자동로그인
        if(auto !== null){
            let data = JSON.parse(localStorage.getItem("autoLogin"));
            window.sessionStorage.setItem('email',data.email);
            window.sessionStorage.setItem('name',data.name);
            window.sessionStorage.setItem('profile',data.profile);
            history.replace('/home/default');
        }
        //아이디 저장
        if(save !== null){
            let data = JSON.parse(localStorage.getItem("saveEmail"));
            //아이디 저장 체크 버튼 활성화
            setLoginOption({
                ...loginOption,
                saveEmail : true
            })
            //아이디 저장 
            setLoginInfo({
                ...loginInfo,
                email : data.email
            })
        }
    },[]);
    

    //일반 로그인
    const login = (e) => {
        e.preventDefault();
        
        let autoLogin = loginOption.autoLogin;
        let saveEmail = loginOption.saveEmail;
        let email = loginInfo.email;
        let password = loginInfo.password;
        let url = "http://localhost:9000/login";
    
        axios.post(url,{
            email,
            password
        }).then((res) => {
            if(res.data.login === 'n'){
                alert('아이디 또는 비밀번호를 확인해주세요');
                return false;
            }

            if(res.data.emailcheck === 'n'){
                alert('해당 이메일의 인증을 해주세요');
                return false;
            }
            window.sessionStorage.setItem('no',res.data.dto.no);
            window.sessionStorage.setItem('email',res.data.dto.email);
            window.sessionStorage.setItem('name',res.data.dto.name);
            window.sessionStorage.setItem('profile',res.data.dto.profile);
            window.sessionStorage.setItem('provider',res.data.dto.provider);

            //아이디 저장
            if(saveEmail === true){
                localStorage.setItem(
                    "saveEmail",
                    JSON.stringify({
                        email: res.data.dto.email
                    })
                );
            }else{
                localStorage.removeItem('saveEmail');
            }
            //자동 로그인 저장
            if(autoLogin === true){
                localStorage.setItem(
                    "autoLogin",
                    JSON.stringify({
                        no : res.data.dto.no,
                        email: res.data.dto.email,
                        name : res.data.dto.name,
                        profile : res.data.dto.profile
                    })
                );
            }
            window.location.replace('/home/default');
        }).catch((err) => {
            console.log(err);
        });
    }

    
    const socialLogin = (res) => {
        let id = res.googleId;
        let url = "http://localhost:9000/sociallogin";

        //카카오 로그인
        //카카오에서 가져온 값은 변수에 담을수가 없다.
        //그래서 어쩔수 없이 직접 명시해줘야한다.
        if(id === undefined){
            window.sessionStorage.setItem('socialProfile',res.profile.properties.profile_image);
            axios.post(url,{
                email : res.profile.id,
                name : res.profile.properties.nickname,
                profile : res.profile.properties.profile_image,
                provider : 'kakao',
            }).then((res) => {
                window.sessionStorage.setItem('no',res.data.dto.no);
                window.sessionStorage.setItem('email',res.data.dto.email);
                window.sessionStorage.setItem('name',res.data.dto.name);
                window.sessionStorage.setItem('profile',res.data.dto.profile);
                window.sessionStorage.setItem('provider',res.data.dto.provider);
                // window.location.replace('/home/default');
            }).catch((err) => {
                console.log(err);
            });
        }
        //구글 로그인
        else{
            window.sessionStorage.setItem('socialProfile',res.profileObj.imageUrl);
            axios.post(url,{
                email : res.googleId,
                name : res.profileObj.name,
                profile : res.profileObj.imageUrl,
                provider : 'google',
            }).then((res) => {
                window.sessionStorage.setItem('no',res.data.dto.no);
                window.sessionStorage.setItem('email',res.data.dto.email);
                window.sessionStorage.setItem('name',res.data.dto.name);
                window.sessionStorage.setItem('profile',res.data.dto.profile);
                window.sessionStorage.setItem('provider',res.data.dto.provider);
                window.location.replace('/home/default');
            }).catch((err) => {
                console.log(err);
            });
        }       
    }

    const responseFail = (err) => {
        console.log(err);
    }

    const changeLoginOption = (e) => {
        console.log(e.target.checked);
        setLoginOption({
            ...loginOption,
            [e.target.name] : e.target.checked
        });
    }
    
    return(
        <div>
            <form onSubmit={login}>
                <input type="text" name="email" onChange={changeLoginInfo} value={loginInfo.email}/><br/>
                <input type="password" name="password" onChange={changeLoginInfo}/><br/>
                <input type="checkbox" name="autoLogin" onChange={changeLoginOption}/>자동로그인 
                <input type="checkbox" name="saveEmail" onChange={changeLoginOption} checked={loginOption.saveEmail} />아이디 저장<br/>
                <Link to="signup">회원가입</Link>
                <Link to="forgotten">찾기</Link><br/>
                <button type="submit">로그인</button>
            </form>
            <KakaoLogin 
                jsKey={'b1851ca9c6bcb21f4986200374e15d27'}
                onSuccess={socialLogin}
                onFailure={responseFail}
                getProfile="true"
            />
            <GoogleLogin
                clientId = {'66532483242-gcnjkf02hb70f0m31i7f2esed4vqahkq.apps.googleusercontent.com'}
                onSuccess = {socialLogin}
                onFailure={responseFail}
            />
        </div>
    )
}
export default Signin;