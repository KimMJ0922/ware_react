import React,{useState} from 'react';
import axios from 'axios';

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
                }
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
                <div>
                    <label for="name">이메일</label>
                    <input type="text" id="name" name="name" placeholder="가입 했을 때 이메일" onChange={changeEmail}/>
                </div>
                <div>
                    <button type="submit">작성완료</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;