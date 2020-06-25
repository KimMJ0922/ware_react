import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router'

const Test = (props) => {
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
        let url = "http://localhost:9000/getcardsetcount";
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
        let url = "http://localhost:9000/gettestlist";
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
            category : 'cardset',
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
    return(
        <>
            {
                choice.length === 0 && subjective.length === 0 &&
                <>
                    <h2>제한 시간 내에 풀지 못했을 경우 빈칸은 오답 처리 됩니다.</h2>
                    {/* 카드의 총 갯수가 4개 미만인 경우 객관식 지원 안함. */}
                    카드 갯수 : {cardCount}<br/>
                    {
                        cardCount >= 4 && 
                        <>
                            객관식 : <input type="text" name="choice" onChange={settingChange} value={setting.choice} onFocus={settingFocus} onBlur={settingBlur}/>문제<br/>
                        </>
                    }
                    주관식 : <input type="text" name="subjective" onChange={settingChange} value={setting.subjective} onFocus={settingFocus} onBlur={settingBlur}/>문제<br/>
                    시간 : <input type="text" name="minute" onChange={settingChange} value={setting.minute} onFocus={settingFocus} onBlur={settingBlur}/>분
                        <input type="text" name="second" onChange={settingChange} value={setting.second} onFocus={settingFocus} onBlur={settingBlur}/>초<br/>
                    <button type="button" onClick={settingBtnClick}>설정 완료</button>
                </>
            }
            
            {/* 문제 */}
            {  
                testCheck === true &&                
                <>
                    {/* 시간 출력 */}
                    {timeText}<br/>
                    {/* 객관식 출력 */}
                    {
                        choice.map((item,i) => {
                            return (
                                <>
                                    <div key={i}>
                                        <img src={item.imgSrc} alt=""/>
                                        {item.question}
                                    </div>
                                    <br/>
                                    {/* 객관식 문항 */}
                                    {
                                        choiceList.map((choice,j) => {
                                            if(i===j){
                                                return (
                                                    <>
                                                        <input type="radio" name={item.question_no} value={choice.answer1} onClick={choiceClick}/>{choice.answer1}<br/>
                                                        <input type="radio" name={item.question_no} value={choice.answer2} onClick={choiceClick}/>{choice.answer2}<br/>
                                                        <input type="radio" name={item.question_no} value={choice.answer3} onClick={choiceClick}/>{choice.answer3}<br/>
                                                        <input type="radio" name={item.question_no} value={choice.answer4} onClick={choiceClick}/>{choice.answer4}<br/>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </>
                            )
                        })
                    }
                    <hr />
                    {/* 주관식 출력 */}
                    {
                        subjective.map((item,i) => {
                            return(
                                <>
                                    <div>
                                        <img src={item.imgSrc} alt=""/>
                                        {item.question}
                                    </div>
                                    
                                    <input type="text" key={i} name={item.question_no} onChange={subjectiveTextChange}/>
                                </>
                            )
                        })
                        
                    }
                    
                    <button type="button" id="scoringBtn" onClick={scoring}>채점하기</button> 
                </>
            }

            {/* 채점 했을 때 나오는 곳 */}
            {
                scoringCheck === true && 
                <>
                    <button type="button" onClick={answerShow} name="right">정답</button>
                    <button type="button" onClick={answerShow} name="wrong">오답</button>
                    <button type="button">다시 풀기</button>
                    정답 갯수 : {rightCnt}<br/>
                    오답 갯수 : {wrongCnt}<br/>
                    <table>
                        <thead>
                            <tr>
                                <th>문제 번호</th>
                                <th>문제</th>
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
                                                <td>{item.question_no}</td>
                                                <td>{item.question}</td>
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
                                                <td>{item.question_no}</td>
                                                <td>{item.question}</td>
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
                </>
            }
        </>
    )
}
export default Test;