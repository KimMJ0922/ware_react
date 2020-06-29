import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router'
import { Grid, Hidden, Paper } from '@material-ui/core';
import BookIcon from '@material-ui/icons/MenuBook';
import MouseIcon from '@material-ui/icons/Mouse';
import TestIcon from '@material-ui/icons/Flag';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import CredIcon from '@material-ui/icons/CreditCard';
import TimeIcon from '@material-ui/icons/AccessTime';
import CheckIcon from '@material-ui/icons/DoneOutline';
import Img from './iu03.jpg';
import './Test.css';

const Test = (props) => {
    var comp = window.sessionStorage.getItem('study');
    var history= useHistory();
    const [setting, setSetting] = useState({
        choice : 0,
        subjective : 0,
        minute : 5,
        second : 0
    });
    const [cardCount, setCardCount] = useState(0);
    //타이머
    const [time, setTime] = useState(0);
    const [timeText, setTimeText] = useState('');
    //문제 보이기
    const [testCheck, setTestCheck] = useState(false);
    //객관식
    const [choice, setChoice] = useState([]);
    //객관식 문항
    const [choiceList, setChoiceList] = useState([]);
    //주관식
    const [subjective, setSubjective] = useState([]);
    //정답 목록
    const [right, setRight] = useState([]);
    const [rightCnt, setRightCnt] = useState(0);
    //오답 목록
    const [wrong, setWrong] = useState([]);
    const [wrongCnt, setWrongCnt] = useState(0);
    //채점 완료 후 페이지 스위치
    const [scoringCheck, setScoringCheck] = useState(false);
    //정답/오답
    const [answerCheck, setAnswerCheck] = useState(false);

    //페이지 처음 시작 했을 때 해당 카드 세트의 카드 총 갯수를 구해온다.
    useEffect(() => {
        let no = window.sessionStorage.getItem('cardset_no');
        
        let url = "";
        if(comp==="board"){
            url = "http://localhost:9000/board/getcardsetcount"
        }else{
            url = "http://localhost:9000/getcardsetcount"
        }

        const getCardSetCount = async() => {
            try {
                let cnt = await axios.post(url,{no});
                setCardCount(cnt.data);
            } catch (error) {
                console.log(error);
            }
        }

        getCardSetCount();
    },[])

    //설정 바꿀 때
    const settingChange = (e) => {
        var regexp = /^[0-9]*$/
        if(regexp.test(e.target.value)){
            setSetting({...setting, [e.target.name] : e.target.value})
        }
    }

    //설정 input에 focus 됐을 때
    const settingFocus = (e) => {
        let value = e.target.value;
        if(value === '0'){
            setSetting({...setting, [e.target.name] : ''})
        }
    }

    //설정 input에 blur 했을 때
    const settingBlur = (e) => {
        let value = e.target.value;
        
        if(value === ''){
            setSetting({...setting, [e.target.name] : '0'})
        }
    }

    //설정 완료 눌렀을 때
    const settingBtnClick = () => {
        console.log(cardCount);
        if(parseInt(setting.choice)+parseInt(setting.subjective) === 0){
            alert("문제 갯수를 적어주세요");
            return false;
        }

        if(parseInt(setting.choice)>cardCount || parseInt(setting.subjective)>cardCount){
            alert("카드 갯수보다 많습니다.");
            return false;
        }

        if(parseInt(setting.minute) + parseInt(setting.second) === 0){
            alert("시간을 설정해주세요");
            return false;
        }
        
        getCard();
        setTime((parseInt(setting.minute)*60)+parseInt(setting.second));
        setTestCheck(true);
    }

    //설정 완료 후 문제 가져오기
    const getCard = () => {
        let choiceListTemp = [];
        let subjectiveTemp = [];
        let choiceQuestionTemp = [];
        let url = "";
        if(comp==="board"){
            url = "http://localhost:9000/board/gettestlist"
        }else{
            url = "http://localhost:9000/gettestlist"
        }

        axios.post(url,{
            no : window.sessionStorage.getItem('cardset_no'),
            choice : setting.choice,
            subjective : setting.subjective
        }).then((res) => {
            let choiceQuestionList = res.data.choiceQuestionList;
            let choiceData = res.data.choiceList;
            let subjectiveData = res.data.subjectiveList;

            choiceQuestionList.map((item,idx) => {
                let data = {
                    cardset_no : item.cardset_no,
                    question_no : item.question_no,
                    question : item.question,
                    answer : item.answer,
                    imgSrc : item.imgSrc,
                    userAnswer : ''
                }
                choiceQuestionTemp.push(data);
            });

            choiceData.map((item,idx) => {
                let data = {
                    answer1 : item.answer1,
                    answer2 : item.answer2,
                    answer3 : item.answer3,
                    answer4 : item.answer4
                }
                choiceListTemp.push(data);
            });

            subjectiveData.map((item,idx) => {
                let data = {
                    cardset_no : item.cardset_no,
                    question_no : item.question_no,
                    question : item.question,
                    answer : item.answer,
                    imgSrc : item.imgSrc,
                    userAnswer : ''
                }
                subjectiveTemp.push(data);
            })

            setChoiceList([...choiceListTemp]);
            setChoice([...choiceQuestionTemp]);
            setSubjective([...subjectiveTemp]);
        }).catch((err) => {
            console.log(err);
        })
    }

    //객관식에서 라디오 버튼 눌렀을 때
    const choiceClick = (e) => {
        let no =e.target.name;
        let value = e.target.value;

        choice.map((item,idx) => {
            if(item.question_no === parseInt(no)){
                item["userAnswer"] = value;
            }
        })
    }

    //주관식에 답 적었을 때
    const subjectiveTextChange = (e) => {
        let no =e.target.name;
        let value = e.target.value;

        subjective.map((item,idx) => {
            if(item.question_no === parseInt(no)){
                item["userAnswer"] = value;
            }
        });
    }

    //타이머 설정 됐을 때
    useEffect(()=> {
        setTimeout(()=>{
            if(testCheck){
                if(time !== 0){
                    setTime(time-1);
                    setTimeText(parseInt(time/60)+'분'+(time%60)+'초');
                }else{
                    document.getElementById('scoringBtn').click();
                }
            }
        },1000)
    },[time])

    //채점 버튼 눌렀을 때
    const scoring = () => {
        let rightTemp = [];
        let wrongTemp = [];
        let wcnt = 0;
        let rcnt = 0;

        //객관식 정답 확인
        choice.map((item,idx)=>{
            if(item.answer === item.userAnswer){
                rightTemp.push({
                    question_no : item.question_no,
                    question : item.question_no,
                    answer : item.answer,
                    userAnswer : item.userAnswer,
                    category : '객관식'
                });

                rcnt = rcnt + 1;
            }else{
                wrongTemp.push({
                    question_no : item.question_no,
                    question : item.question_no,
                    answer : item.answer,
                    userAnswer : item.userAnswer,
                    category : '객관식'
                });

                wcnt = wcnt + 1;
            }
        });

        subjective.map((item,idx)=>{
            if(item.answer === item.userAnswer){
                rightTemp.push({
                    question_no : item.question_no,
                    question : item.question_no,
                    answer : item.answer,
                    userAnswer : item.userAnswer,
                    category : '주관식'
                });

                rcnt = rcnt + 1;
            }else{
                wrongTemp.push({
                    question_no : item.question_no,
                    question : item.question_no,
                    answer : item.answer,
                    userAnswer : item.userAnswer,
                    category : '주관식'
                });

                wcnt = wcnt + 1;
            }
        });

        setRight([...rightTemp]);
        setWrong([...wrongTemp]);
        setRightCnt(rcnt);
        setWrongCnt(wcnt);
        setTestCheck(!testCheck);
        setScoringCheck(!scoringCheck);
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

    useEffect(() => {
        if(scoringCheck){
            setRecord();
        }
    },[scoringCheck]);

    //결과 저장
    const setRecord = () => {
        let url = "http://localhost:9000/setrecord";

        axios.post(url,{
            member_no : window.sessionStorage.getItem('no'),
            category : window.sessionStorage.getItem('study'),
            cardset_no : window.sessionStorage.getItem('cardset_no'),
            rightcnt : rightCnt,
            wrongcnt : wrongCnt,
            method : 'test',
            right,
            wrong
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
        })
    }

  //학습하기로 이동
  const learning = () =>{
    history.push('/study');
    }

  //주관식으로 이동
  const Subjective = () => {
    history.push('/subjective');
  }

  //객관식 이동
  const Choice = () => {
    history.push('/choice');
  }
  //테스트 이동
  const goTest = () => {
    history.push('/test');
  }

    return(
        <>
        <div className="test_body">
            
            {
                choice.length === 0 && subjective.length === 0 &&
                <>
                
                <Grid container>
                    <Grid item xs={12} md={12}>
                    <p className="test_top_font">제한 시간 내에 풀지 못했을 경우 빈칸은 오답 처리 됩니다.</p>
                    </Grid>
                </Grid>
                    {/* 카드의 총 갯수가 4개 미만인 경우 객관식 지원 안함. */}
                    <Grid container>
                    <Hidden only={['xs','sm']}>
                    <Grid md={4}>
                        <div className="sbjc_menu_box">
                        <p>문제 풀기</p>
                        <button type="button" onClick={learning}><BookIcon/>학습하기</button>
                        {
                        cardCount >=4 && <button on type="button" onClick={Choice}><MouseIcon/>객관식</button>
                        }
                        <button type="button" onClick={Subjective}><KeyboardIcon/>주관식</button>
                        <button type="button" onClick={goTest}><TestIcon/>테스트</button>
                        </div>
                    </Grid>
                    </Hidden>

                    <Grid item xs={12} md={8}>
                    <div className="test_select_box">
                    <p className="test_card_total_cnt"><CredIcon/>카드 갯수 : {cardCount}</p>
                    {
                        cardCount >= 4 && 
                        <>
                          <p className="test_choice_cnt"><MouseIcon/>객관식 : <input type="text" name="choice" onChange={settingChange} value={setting.choice} onFocus={settingFocus} onBlur={settingBlur}/>문제</p>
                        </>
                    }
                    <p className="test_sbjt_cnt"><KeyboardIcon/>주관식 : <input type="text" name="subjective" onChange={settingChange} value={setting.subjective} onFocus={settingFocus} onBlur={settingBlur}/>문제</p>
                    <p className="test_time_cnt"><TimeIcon/>시간 : <input type="text" name="minute" onChange={settingChange} value={setting.minute} onFocus={settingFocus} onBlur={settingBlur}/>분
                        <input type="text" name="second" onChange={settingChange} value={setting.second} onFocus={settingFocus} onBlur={settingBlur}/>초</p>
                    <button type="button" onClick={settingBtnClick}>설정 완료</button>
                    </div>
                    </Grid>
                    {/* 컨테이너 끝 */}
                </Grid>
                </>
            }
            {/* 문제 */}
            <Grid item xs={12} md={12}>
            {  
                testCheck === true &&                
                <>
               <Grid container>
               <Hidden only={['xs','sm']}>
                    <Grid md={4}>
                        <div className="sbjc_menu_box">
                        <p>문제 풀기</p>
                        <button type="button" onClick={learning}><BookIcon/>학습하기</button>
                        {
                        cardCount >=4 && <button on type="button" onClick={Choice}><MouseIcon/>객관식</button>
                        }
                        <button type="button" onClick={Subjective}><KeyboardIcon/>주관식</button>
                        <button type="button" onClick={goTest}><TestIcon/>테스트</button>
                        </div>
                    </Grid>
                    </Hidden>

                   <Grid item md={8}>
                <div className="test_test_box">
                    {/* 시간 출력 */}
                    <p> <TimeIcon/> 남은 시간 {timeText}</p>
                    <p>객관식</p>
                    {/* 객관식 출력 */}
                    {                   
                        choice.map((item,i) => {
                            return (
                                <>
                                <Paper className="test_ch_box">
                                    <div key={i}>                                
                                        <p className="test_ch_title_font">{item.question}</p>
                                    </div>
                                    <br/>
                                    {/* 객관식 문항 */}
                                    {
                                        choiceList.map((choice,j) => {
                                            if(i===j){
                                                return (
                                                    <>
                                                        <label className="text_radio_box">
                                                            <Grid container>
                                                                <Grid item xs={6} md={8}>
                                                                <input type="radio" name={item.question_no} value={choice.answer1} onClick={choiceClick}/><span>{choice.answer1}</span><br/>
                                                                <input type="radio" name={item.question_no} value={choice.answer2} onClick={choiceClick}/><span>{choice.answer2}</span><br/>
                                                                <input type="radio" name={item.question_no} value={choice.answer3} onClick={choiceClick}/><span>{choice.answer3}</span><br/>
                                                                <input type="radio" name={item.question_no} value={choice.answer4} onClick={choiceClick}/><span>{choice.answer4}</span><br/>
                                                                </Grid>
                                                                <Grid item xs={6} md={4}>
                                                                <img src={item.imgSrc} alt=""/>                                                          
                                                                </Grid>
                                                            </Grid>
                                                        </label>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                    </Paper>
                                </>
                            )
                        })
                    }            
                    {/* 주관식 출력 */}
                    <p>주관식</p>
                    <Paper className="test_subj_box">  
                    {                                               
                        subjective.map((item,i) => {
                            return(
                                <>         
                                        
                                        <p>{item.question}</p>
                                        <p><img src={item.imgSrc} alt=""/></p>                                                                 
                                    <input type="text" key={i} name={item.question_no} onChange={subjectiveTextChange} placeholder='답을 입력하시오'/>
                                  
                                </>
                            )
                        })                
                    }
                      </Paper>
                                   
                    <button type="button" id="scoringBtn" onClick={scoring} className="test_check_btn">채점하기</button>                                     
                   </div>
                   </Grid>
                   {/* 컨테이너 끝 */}
                </Grid>               
            </>
        }
            </Grid>
            {/* 채점 했을 때 나오는 곳 */}
           
            {
                scoringCheck === true && 
                <>
                 <Grid container>
                 <Hidden only={['xs','sm']}>
                    <Grid md={4}>
                        <div className="sbjc_menu_box">
                        <p>문제 풀기</p>
                        <button type="button" onClick={learning}><BookIcon/>학습하기</button>
                        {
                        cardCount >=4 && <button on type="button" onClick={Choice}><MouseIcon/>객관식</button>
                        }
                        <button type="button" onClick={Subjective}><KeyboardIcon/>주관식</button>
                        <button type="button" onClick={goTest}><TestIcon/>테스트</button>
                        </div>
                    </Grid>
                    </Hidden>
                
                 <Grid item xs={12} md={8}>
                <Paper className="text_result_box">
                    <p className="text_result_return_box">
                    <button type="button" onClick={answerShow} name="right">정답</button>
                    <button type="button" onClick={answerShow} name="wrong">오답</button>
                    <button type="button">다시 풀기</button>
                    </p>
                    <p className="text_result_check_box">
                       <CheckIcon style={{color:'#bfff00'}}/> 정답: {rightCnt}
                       <CheckIcon style={{color:'red'}}/> 오답: {wrongCnt}
                    </p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>답</th>
                                <th>사용자 답</th>
                                <th>문제 유형</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                answerCheck === false ? 
                                wrong.map((item,idx) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.answer}</td>
                                                <td>{item.userAnswer}</td>
                                                <td>{item.category}</td>
                                            </tr>
                                        </>
                                    )
                                })

                                :
                                
                                right.map((item,idx) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.answer}</td>
                                                <td>{item.userAnswer}</td>
                                                <td>{item.category}</td>
                                            </tr>
                                        </>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                    </Paper>
                    </Grid>
                    {/* 컨테이너 */}
                    </Grid>
                </>
            }
               <Grid container>
        <Hidden only={['md','lg','xl']}>
          <Grid xs={12}>
            <div className="sbjc_menu_box">
            <p>문제 풀기</p>
            <button type="button" onClick={learning}><BookIcon/>학습하기</button>
            {
              cardCount >=4 && <button on type="button" onClick={Choice}><MouseIcon/>객관식</button>
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
export default Test;