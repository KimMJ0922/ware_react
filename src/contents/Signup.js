import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './SignUp.css';
const Signup=()=>{
    const [userInfo, setUserInfo] = useState({
        email : '',
        name : '',
        password : '',
        birth : ''
    })
    const [eff, setEff] = useState({
        emailEff : '이메일',
        passEff : '비밀번호',
        nameEff : '이름',
        birthEff : '생년월일'
    });

    const [check, setCheck] = useState({
        email : false,
        password : false,
        name : false,
        birth : false
    });
    const [alert, setAlert] = useState('');


    const formSubmit = (e) => {
        e.preventDefault();
        if(check.email === false){
            setAlert('이메일이(가) 공백이거나 형식이 맞지 않습니다.');
            return false;
        }

        if(check.password === false){
            setAlert('비밀번호이(가) 공백이거나 형식이 맞지 않습니다.');
            return false;
        }

        if(check.name === false){
            setAlert('이름이(가) 공백이거나 형식이 맞지 않습니다.');
            return false;
        }

        if(check.birth === false){
            setAlert('생년월일이(가) 공백이거나 형식이 맞지 않습니다.');
            return false;
        }
        setAlert('');
        let url = "http://localhost:9000/signup";
        axios.post(url,{
            userInfo
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    //input 값 변경했을 때
    const updateValue = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value
        });
        setCheck({
            ...check
        });
    }

    //이메일 중복 체크
    useEffect(()=>{
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        const email = userInfo.email;
        //빈 문자열
        if(email === null || email === ''){
            setEff({
                ...eff,
                emailEff : '이메일'
            });
            setCheck({
                ...check,
                email : false
            });
        }
        //이메일 유효성 검사
        else if(!emailRegex.test(email)){
            console.log(emailRegex.test(email));
            setEff({
                ...eff,
                emailEff : '이메일 형식이 아닙니다.'
            });
            setCheck({
                ...check,
                email : false
            });
        }
        //통과
        else{
            let url = "http://localhost:9000/emailoverlap";
            axios.post(url,email)
            .then((res) => {
                if(res.data.check){
                    setEff({
                        ...eff,
                        emailEff : '중복된 이메일입니다.'
                    });
                    setCheck({
                        ...check,
                        email : false
                    });
                }else{
                    setEff({
                        ...eff,
                        emailEff : '이메일'
                    });
                    setCheck({
                        ...check,
                        email : true
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },[userInfo.email]);

    //비밀번호 확인
    useEffect(()=>{
        const password = userInfo.password;
        if(password.length !== 0 && password.length < 6){
            setEff({
                ...eff,
                passEff : '비밀번호가 짧습니다.'
            });
            setCheck({
                ...check,
                password : false
            });
        }else{
            setEff({
                ...eff,
                passEff : '비밀번호'
            });
            setCheck({
                ...check,
                password : true
            });
        }
    },[userInfo.password])

    //이름 확인
    useEffect(() => {
        const name = userInfo.name;
        //정규식(한글(자음,모음 조합), 알파벳 대,소문자, 숫자, 언더바(_)만 가능)
        let RegExp = /^[가-힣a-zA-Z0-9_]+$/;
        
        if(name.length === 0){
            setEff({
                ...eff,
                nameEff : '이름'
            });
            setCheck({
                ...check,
                name : false
            });
        }
        //이름 형식이 안맞을 때
        else if(name.length !== 0 && !RegExp.test(name)){
            setEff({
                ...eff,
                nameEff : '이름 형식이 아닙니다.'
            });
            setCheck({
                ...check,
                name : false
            });
        }else{
            //이름 중복 체크
            let url = "http://localhost:9000/nameoverlap";
            axios.post(url,{name})
            .then((res) => {
                console.log(res.data.check);
                //중복된 이름이면 
                if(res.data.check){
                    setEff({
                        ...eff,
                        nameEff : '중복된 이름입니다.'
                    });
                    setCheck({
                        ...check,
                        name : false
                    });
                }else{
                    setEff({
                        ...eff,
                        nameEff : '이름'
                    });
                    setCheck({
                        ...check,
                        name : true
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    },[userInfo.name]);

    //생년월일 
    useEffect(() => {
        const birth = userInfo.birth;
        //생년월일 양식이 안맞을 때
        if(birth.length !== 0 && birth.length !== 8){
            setEff({
                ...eff,
                birthEff : '생년월일 형식이 아닙니다.'
            });
            setCheck({
                ...check,
                birth : false
            });
        }
        //생년월일 초기
        else if(birth.length === 0){
            setEff({
                ...eff,
                birthEff : '생년월일'
            });
            setCheck({
                ...check,
                birth : false
            });
        }
        //양식이 맞을 때
        else{
            //사용자가 입력한 생년월일
            const brithYear = parseInt(birth.substring(0,4));
            const brithMonth = parseInt(birth.substring(4,6));
            const brithDay = parseInt(birth.substring(6,8));
            const birthDate = new Date(brithYear,brithMonth-1,brithDay);
            const nowDate = new Date();
            console.log(birthDate, nowDate);
            if(birthDate>nowDate){
                setEff({
                    ...eff,
                    birthEff : '생년월일이 현재 날짜를 지났습니다.'
                });
                setCheck({
                    ...check,
                    birth : false
                });
            }else{
                setEff({
                    ...eff,
                    birthEff : '생년월일'
                });
                setCheck({
                    ...check,
                    birth : true
                });
            }
            
        }
    },[userInfo.birth]);

    return(
        <div>
            <div className="login_top">SingUp</div>
            <form onSubmit={formSubmit}>
                <div className="signUp_label_box">
                    <label for="email" className="signup_label">{eff.emailEff}</label><br/>
                    <input type="text" className="signup_input" id="email" name="email" onChange={updateValue} placeholder="email@domain.com"/>
                </div>
                <div className="signUp_label_box">
                    <label for="password" className="signup_label">{eff.passEff}</label><br/>
                    <input type="password" className="signup_input" id="password" name="password" onChange={updateValue} placeholder="●●●●●●●"/>
                </div>
                <div className="signUp_label_box">
                    <label for="name" className="signup_label">{eff.nameEff}</label><br/>
                    <input type="text" className="signup_input" id="name" name="name" onChange={updateValue} placeholder="이름1234"/>
                </div>
                <div className="signUp_label_box">
                    <label for="birth" className="signup_label">{eff.birthEff}</label><br/>
                    <input type="text" className="signup_input" id="birth" name="birth" onChange={updateValue} placeholder="19000101"/>
                </div>
                <div style={{height:'20px'}}>
                    <span>{alert}</span>
                </div>
                <div>
                    <button type="submit" className="signup_submit">작성 완료</button>
                </div>
            </form>
        </div>
    );
}
export default Signup;