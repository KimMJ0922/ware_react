import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';
import BookIcon from '@material-ui/icons/MenuBook';
import MouseIcon from '@material-ui/icons/Mouse';
import TestIcon from '@material-ui/icons/Flag';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import CredIcon from '@material-ui/icons/CreditCard';
import CheckIcon from '@material-ui/icons/DoneOutline';
import './Choice.css';
import { Hidden, Grid } from '@material-ui/core';

const Choice = () => {
    var comp = window.sessionStorage.getItem('study');
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
    const [choiceList, setChoiceList] = useState([]);

    const [cardListLength, setCardListLength] = useState(0);
    const [random, setRandom] = useState(0);
    const [rightNum, setRightNum] = useState([]);
    const [wrongNum, setWrongNum] = useState([]);
    const [right, setRight] = useState([]);
    const [wrong, setWrong] = useState([]);
    const [rightAnswer, setRightAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [answerCheck, setAnswerCheck] = useState(false);
    const [scoring, setScoring] = useState(false);

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

    useEffect(() => {
        const getCardSet = async() => {
            let url = "";
            if(comp==="board"){
                url = "http://localhost:9000/board/getcardchoicelist"
            }else{
                url = "http://localhost:9000/getcardchoicelist"
            }
            
            try {
                let list = await axios.post(url,{no : cardset_no});
                let choiceList = list.data.choiceList;
                let mem = list.data.mdto
                let cardSet = list.data.csdto;
                let card = list.data.cList;
                setChoiceList([...choiceList]);
                setMemberInfo({...mem});
                if(comp==="board"){
                    setCardSetInfo({
                      no : cardSet.board_no,
                      title : cardSet.subject,
                      comment : cardSet.content,
                      open_scope : '',
                      update_scope : ''
                    })
                }else{
                setCardSetInfo({...cardSet});
                }
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
    },[cardList]);

    const btnClick = (e) => {
        let value = e.target.value;
        console.log(value);
        cardList.map((item,i) => {
            if(i === random){
                if(item.answer === value){
                    setRightAnswer(rightAnswer+1);
                    rightNum.push(random);
                    right.push({
                        question_no : item.question_no,
                        question : item.question,
                        userAnswer : value,
                        answer : item.answer,
                        category : '객관식'
                    });
                }else{
                    setWrongAnswer(wrongAnswer+1);
                    wrongNum.push(random);
                    wrong.push({
                        question_no : item.question_no,
                        question : item.question,
                        userAnswer : value,
                        answer : item.answer,
                        category : '객관식'
                    });
                }
            }
        });
        randomNum();
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


    //다시하기
    const retry = () => {
        history.go(0);
    }

    useEffect(() => {
        if(cardList.length !== 0 && rightAnswer+wrongAnswer === cardList.length){
            setRecord();
        }
    },[rightAnswer,wrongAnswer]);

    //결과 저장
    const setRecord = () => {
        let url = "http://localhost:9000/setrecord";

        axios.post(url,{
            member_no : window.sessionStorage.getItem('no'),
            category : 'cardset',
            cardset_no : window.sessionStorage.getItem('cardset_no'),
            rightcnt : rightAnswer,
            wrongcnt : wrongAnswer,
            method : 'choice',
            right,
            wrong
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
        <div className="ch_body">
        <Grid item xs={12} md={12}>
          <p className="std_title_font">{cardSetInfo.title}</p>
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
            <p>객관식 정보</p>
            <p><CredIcon/>총 카드수 : {cardList.length}</p>
            <p><CheckIcon style={{color:'#bfff00'}}/>정답 : {rightAnswer}</p>
            <p><CheckIcon style={{color:'red'}}/>오답 : {wrongAnswer}</p>
            </div>
          </Grid>
          </Hidden>
            {
                cardList.length !== rightAnswer+wrongAnswer && cardList.map((item,i) => {
                    if(i === random){
                        return (
                            <>
                            <Grid item xs={12} md={8}>
                                <div className="ch_mun_box">
                                <p className="ch_mun_qus_box">{item.question}</p>
                                <p className="ch_mun_img_box"><img src={item.imgSrc} alt=""/></p>
                                {
                                    choiceList.map((item,i) => {
                                        if(i === random){
                                            return(
                                                <>
                                                    <button type="button" value={item.answer1} onClick={btnClick}>{item.answer1}</button>
                                                    <button type="button" value={item.answer2} onClick={btnClick}>{item.answer2}</button>
                                                    <button type="button" value={item.answer3} onClick={btnClick}>{item.answer3}</button>
                                                    <button type="button" value={item.answer4} onClick={btnClick}>{item.answer4}</button>
                                                </>
                                            )
                                        }
                                    })
                                }
                                </div>
                                </Grid>
                                
                            </>
                        )
                    }
                })
            }
           
            
            {
                cardList.length === rightAnswer+wrongAnswer && 
                <>
                <Grid xs={12} md={8}>
                    <div className="ch_result_box">
                    <button type="button" onClick={answerShow} name="right">정답</button>
                    <button type="button" onClick={answerShow} name="wrong">오답</button>
                    <button type="button" onClick={retry}>다시 풀기</button>
                   
                    <table>
                        <thead>
                            <tr>
                                <th>문제</th>
                                <th>정답</th>
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
                    </div>
                </Grid>
                </>
            }
             </Grid>
            </div>
            
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
        </>
    )
}

export default Choice;