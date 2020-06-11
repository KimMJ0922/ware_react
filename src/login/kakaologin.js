import React,{useState,useEffect} from 'react';
import KakaoLogin from 'react-kakao-login';
import {GoogleLogin} from'react-google-login';
import { Link } from 'react-router-dom';

const Kakaologin = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [provider, setProvider] = useState('');
    const [profileImg ,setProfileImg] = useState('')


    const responseKakao = (res) => {
        setId(res.profile.id);
        setProvider('kakao');
        setName(res.profile.properties.nickname);
        setProfileImg(res.profile.properties.profile_image);
        console.log(res.profile)
    }

    const responseGoogle = (res) => {
        setId(res.googleId);
        setProvider('google');
        setName(res.profileObj.name);
        setProfileImg(res.profileObj.imageUrl);
        console.log();
    }

    const responseFail = (err) => {
        console.log(err);
    }

    return (
        <div>
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
    );
}

export default Kakaologin;