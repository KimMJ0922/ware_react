import React,{useState} from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState('');

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const formSubmit = (e) => {
        e.preventDefault();
        let url = "http://localhost:9000/forgotten";
            axios.post(url,{email})
            .then((res) => {
                let check = res.data.check;
                if(!check){
                    setAlert('해당 이메일이 없습니다.');
                    return false;
                }
                window.alert('작성한 이메일에 임시 비밀번호를 발송했습니다.');
                
            }).catch((err) => {
                console.log(err);
            });

    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <div>
                    {alert}
                </div>
                <div className="chps_body">
                    <label for="name">이메일 입력</label>
                    <input type="text" id="name" name="name" placeholder="이메일을 입력해 주세요" onChange={changeEmail}/>
                    <button type="submit">작성완료</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;