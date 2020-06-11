import React,{useState} from 'react';
import './content.css'
import axios from 'axios';
const Signup=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
        let url = "http://localhost:9000/signup";
        axios.post(url,{
            email,
            password,
            name,
            birth
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    return(
        <div>
            <form onSubmit={formSubmit}>
                <div>
                    <label for="email">이메일</label>
                    <input type="text" id="email" name="email" value={email} 
                        onChange={
                            ({target : {value} }) => setEmail(value)
                        }
                    />
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" name="password" value={password}
                        onChange = {
                            ({target : {value} }) => setPassword(value)
                        }
                    />
                </div>
                <div>
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" value={name}
                        onChange = {
                            ({target : {value} }) => setName(value)
                        }
                    />
                </div>
                <div>
                    <label for="birth">생년월일</label>
                    <input type="text" id="brith" name="brith" value={birth}
                        onChange = {
                            ({target : {value} }) => setBirth(value)
                        }
                    />
                </div>
                <div>
                    <button type="submit">작성 완료</button>
                </div>
            </form>
        </div>
    );
}
export default Signup;