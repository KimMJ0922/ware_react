import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';
import { Grid, Hidden } from '@material-ui/core';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import BookIcon from '@material-ui/icons/MenuBook';
import MouseIcon from '@material-ui/icons/Mouse';
import TestIcon from '@material-ui/icons/Flag';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import CredIcon from '@material-ui/icons/CreditCard';
import CheckIcon from '@material-ui/icons/DoneOutline';
import './Subjective.css';

const Subjective = () => {
    var routerHistory = useHistory();
    var history = useHistory();
    const [cardset_no, setCardSet_no] = useState(window.sessionStorage.getItem('cardset_no'));
    const [memberInfo, setMemberInfo] = useState({
        no : '',
        name : '',
        email : '',
        profile : '',
        provider : ''
    });
    const [cardSetInfo, setCardSetInfo] = useState({
        no : '',
        title : '',
        comment : '',
        open_scope : '',
        update_scope : ''
    });
    const [cardList, setCardList] = useState([]);
    const [cardListLength, setCardListLength] = useState(0);
    const [random, setRandom] = useState(0);
    const [inputText, setInputText] = useState('');
    const [rightNum, setRightNum] = useState([]);
    const [wrongNum, setWrongNum] = useState([]);
    const [right, setRight] = useState([]);
    const [wrong, setWrong] = useState([]);
    const [rightAnswer, setRightAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [answerCheck, setAnswerCheck] = useState(false);
    const randomNum = () => {
        while(true){
            console.log(rightAnswer+wrongAnswer);
            if(cardList.length-1 === rightAnswer+wrongAnswer){
                break;
            }
            let ran = Math.random();
            let ransu = Math.floor(ran*cardList.length);
            if(rightNum.indexOf(ransu) === -1 && wrongNum.indexOf(ransu) === -1){
                setRandom(ransu);
                break;
            }
            
        }
    }

    const learning = () =>{
        routerHistory.push('/study');
    }

  //주관식으로 이동
  const Subjective = () => {
    routerHistory.push('/subjective');
  }

  //객관식 이동
  const Choice = () => {
    routerHistory.push('/choice');
  }
  //테스트 이동
  const goTest = () => {
    routerHistory.push('/test');
  }

    useEffect(() => {
        const getCardSet = async() => {
            let url = "http://localhost:9000/getcardlist";
            try {
                let list = await axios.post(url,{no : cardset_no});
                let mem = list.data.mdto
                let cardSet = list.data.csdto;
                let card = list.data.cList;

                setMemberInfo({...mem});
                setCardSetInfo({...cardSet});
                let t = [];
                let leng = 0;
                card.map((item,i) => {
                    let data = {
                        cardset_no : item.cardset_no,
                        question_no : item.question_no,
                        question : item.question,
                        answer : item.answer,
                        imgSrc : item.imgSrc
                    }
                    leng = i;
                    t.push(data);
                })

                setCardList([...t]);
            } catch (err) {
                console.log(err);
            }
        }
        
        getCardSet();
        
    },[]);

    useEffect(() => {
        randomNum();
    },[cardList])

    //텍스트 바뀔 때
    const textChange = (e) => {
        setInputText(e.target.value);
    }

    //입력 완료 버튼 눌렀을 때
    const btnClick = () => {
        cardList.map((item,i) => {
            if(i===random){
                if(item.answer === inputText){
                    setRightAnswer(rightAnswer+1);
                    rightNum.push(random);
                    right.push({
                        question_no : item.question_no,
                        question : item.question,
                        userAnswer : inputText,
                        answer : item.answer
                    });
                }else{
                    setWrongAnswer(wrongAnswer+1);
                    wrongNum.push(random);
                    wrong.push({
                        question_no : item.question_no,
                        question : item.question,
                        userAnswer : inputText,
                        answer : item.answer

                    });
                }
            }
        });
        randomNum();
        setInputText('');
    }

    //정답/오답 보기
    const answerShow = (e) => {
        let name = e.target.name
        if(name === 'wrong'){
            setAnswerCheck(false);
        }else{
            setAnswerCheck(true);
        }
    }

    //엔터 했을 때
    const keyEnter = (e) => {
        if(e.key === 'Enter'){
            btnClick();
        }
    }

    const retry = () => {
        history.go(0);
    }
    return (
        <>
        <div className="sbjc_body">
        <Grid container>
        <Grid item xs={12} md={12}>
          <p className="std_title_font">{cardSetInfo.title}</p>
        </Grid>
      </Grid>

      <Grid container>
        <Hidden only={['xs','sm']}>
          <Grid xs={12} md={4}>
            <div className="sbjc_menu_box">
            <p>문제 풀기</p>
            <button type="button" onClick={learning}><BookIcon/>학습하기</button>
            {
              cardList.length >=4 && <button on type="button" onClick={Choice}><MouseIcon/>객관식</button>
            }
            <button type="button" onClick={Subjective}><KeyboardIcon/>주관식</button>
            <button type="button" onClick={goTest}><TestIcon/>테스트</button>
            <p>주관식 정보</p>
            <p><CredIcon/>총 카드수 : {cardList.length}</p>
            <p><CheckIcon style={{color:'#bfff00'}}/>정답 : {rightAnswer}</p>
            <p><CheckIcon style={{color:'red'}}/>오답 : {wrongAnswer}</p>
            </div>
          </Grid>
          </Hidden>
          <Grid xs={12} md={8}>
               <div className="sbjc_content_box">
                    <div className="sbjc_content">
                
                     {
                cardList.length === rightAnswer+wrongAnswer && 
                <>
                     <p className="sbjc_r_w_re_box"> 
                        <button type="button" onClick={answerShow} name="right">맞춘 답</button>
                        <button type="button" onClick={answerShow} name="wrong">틀린 답</button>
                        <button type="button" onClick={retry}>다시 풀기</button>
                        </p>

                    {answerCheck === false ? "" : ""}
                    <table className="sbjc_result_table">
                        <thead>
                            <tr>
                                <th>문제</th>
                                <th>답</th>
                                <th>사용자 답</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                answerCheck === false && wrong.map((item) => {
                                    return(
                                        <tr>
                                            <td>{item.question}</td>
                                            <td>{item.answer}</td>
                                            <td>{item.userAnswer}</td>
                                        </tr>
                                    )
                                })
                            }

                            {
                                answerCheck === true && right.map((item) => {
                                    return(
                                        <tr>
                                            <td>{item.question}</td>
                                            <td>{item.answer}</td>
                                            <td>{item.userAnswer}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
            }                   
                    {
                            cardList.length !== rightAnswer+wrongAnswer && cardList.map((item,i) => {
                                if(i === random){
                                    return (
                                        <>
                                            <img src={item.imgSrc} alt="" style={{width:'150px', height:'150px'}}/>
                                            {item.question}<br/>
                                            <input type="text" onChange={textChange} onKeyPress={keyEnter} value={inputText} autoFocus="true"/><button type="button" onClick={btnClick}><CheckIcon/></button>
                                        </>
                                    )
                                }
                            })
                    }
                    </div>
               </div>
          </Grid>
        </Grid>
        <Grid container>
        <Hidden only={['md','lg','xl']}>
          <Grid xs={12}>
            <div className="sbjc_menu_box">
            <p>주관식 정보</p>
            <span className="sbjc_result_box"><CredIcon/>총 카드수 : {cardList.length}
            <CheckIcon style={{color:'#bfff00'}}/>정답 : {rightAnswer}
            <CheckIcon style={{color:'red'}}/>오답 : {wrongAnswer}</span>
            <p>문제 풀기</p>
            <button type="button" onClick={learning}><BookIcon/>학습하기</button>
            {
              cardList.length >=4 && <button on type="button" onClick={Choice}><MouseIcon/>객관식</button>
            }
            <button type="button" onClick={Subjective}><KeyboardIcon/>주관식</button>
            <button type="button" onClick={goTest}><TestIcon/>테스트</button>
            
            </div>
          </Grid>
          </Hidden>
          </Grid>
            </div>
        </>
    )
}

export default Subjective;