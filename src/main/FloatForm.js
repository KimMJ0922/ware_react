import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const FloatForm=(props)=>{
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(2),
            width: '45ch',
          },
        },
        button: {
          margin: theme.spacing(2),
          width: '15ch',
          height: '7ch',
        },
    }));
    const classes = useStyles();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const changeName = (e) =>{
        setName(e.target.value);
    }
    const changeEmail = (e) =>{
        setEmail(e.target.value);
    }
    
    const start=()=>{
        props.MainstartBtn({
        name:name,
        email:email
        });
    }
    return(
        <div className="FloatForm">
            <span className="Formment">지금 바로 회원가입 하세요!</span>
            <span className="Formment">Ware.gg를 사용하는 학생의 90%가 높은 점수를 받았다고 합니다.</span>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="이름" variant="outlined" onChange={changeName}/>
                <TextField id="standard-basic" label="이메일" variant="outlined" onChange={changeEmail}/>
                <Button variant="contained" style={{"background-color":"#294174","color":"white"}} className={classes.button} onClick={start}>시작하기</Button>
            </form>
        </div>
    )
}
export default FloatForm;