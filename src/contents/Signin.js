import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './content.css'
import KakaoLogin from 'react-kakao-login';
import {GoogleLogin} from'react-google-login';
import axios from 'axios';

const Signin=()=>{
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [test, setTest] = useState('');
    //일반 로그인
    const login = (e) => {
        e.preventDefault();
        let url = "http://localhost:9000/login";
        axios.post(url,{
            email,
            password
        }).then((res) => {
            if(res.data.login === 'n'){
                alert("아이디/비밀번호를 확인해주세요");
                return false;
            }
            console.log(res.data);
            //이메일 인증 여부 확인
            if(res.data.emailcheck === 'n'){
                alert("이메일 인증을 해주세요");
            }else{
                //인증 됐으면 세션
                window.sessionStorage.setItem('email',res.data.dto.email);
                window.sessionStorage.setItem('name',res.data.dto.name);
                window.sessionStorage.setItem('profile',res.data.dto.profile);
                window.sessionStorage.setItem('point',res.data.dto.point);
                window.sessionStorage.setItem('admin',res.data.dto.admin);
                history.replace('/home/default');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const responseKakao = (res) => {
        let url = "http://localhost:9000/sociallogin";
        axios.post(url,{
            email : res.profile.id,
            name : res.profile.properties.nickname,
            profile : res.profile.properties.profile_image,
            provider : 'kakao'
        }).then((res) => {
            window.sessionStorage.setItem('email',res.data.dto.email);
            window.sessionStorage.setItem('name',res.data.dto.name);
            window.sessionStorage.setItem('profile',res.data.dto.profile);
            window.sessionStorage.setItem('point',res.data.dto.point);
            window.sessionStorage.setItem('admin',res.data.dto.admin);
            window.sessionStorage.setItem('provider','kakao');
            history.replace('/home/default');
        }).catch((err) => {
            console.log(err);
        });
    }

    const responseGoogle = (res) => {
        let url = "http://localhost:9000/sociallogin";
        axios.post(url,{
            email : res.googleId,
            name : res.profileObj.name,
            profile : res.profileObj.imageUrl,
            provider : 'google'
        }).then((res) => {
            window.sessionStorage.setItem('email',res.data.dto.email);
            window.sessionStorage.setItem('name',res.data.dto.name);
            window.sessionStorage.setItem('profile',res.data.dto.profile);
            window.sessionStorage.setItem('point',res.data.dto.point);
            window.sessionStorage.setItem('admin',res.data.dto.admin);
            window.sessionStorage.setItem('provider','google');
            history.replace('/home/default');
        }).catch((err) => {
            console.log(err);
        });
    }

    const responseFail = (err) => {
        console.log(err);
    }

    return(
        <div>
            <form onSubmit={login}>
                <input type="text" name="email" value={email} onChange={({target : {value}})=>{setEmail(value)}}/><br/>
                <input type="password" name="password" value={password} onChange={({target : {value}})=>{setPassword(value)}}/>
                <button type="submit">로그인</button>
            </form>
            <KakaoLogin 
                jsKey={'b1851ca9c6bcb21f4986200374e15d27'}
                onSuccess={responseKakao}
                onFailure={responseFail}
                getProfile="true"
            />
            <GoogleLogin
                clientId = {'66532483242-gcnjkf02hb70f0m31i7f2esed4vqahkq.apps.googleusercontent.com'}
                onSuccess = {responseGoogle}
                onFailure={responseFail}
            />
            <Link to="signup">회원가입</Link>
        </div>
    )
}
export default Signin;