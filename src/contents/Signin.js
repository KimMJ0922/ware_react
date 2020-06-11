import React,{useState} from 'react';
import './content.css'
import Kakaologin from '../login/kakaologin';
import axios from 'axios';

const Signin=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            //이메일 인증 여부 확인
            if(res.data.emailcheck !== 'y'){
                alert("이메일 인증을 해주세요");
            }else{
                //인증 됐으면 세션
                
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    return(
        <div>
            <form onSubmit={login}>
                <input type="text" name="email" value={email} onChange={({target : {value}})=>{setEmail(value)}}/><br/>
                <input type="password" name="password" value={password} onChange={({target : {value}})=>{setPassword(value)}}/>
                <button type="submit">로그인</button>
            </form>
            <Kakaologin/>
        </div>
    )
}
export default Signin;