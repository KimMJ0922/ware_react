import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router'

const Test = (props) => {
    var history= useHistory();
    const [setting, setSetting] = useState({
        choice : 0,
        subjective : 0,
        minute : 0,
        second : 0
    });
    const [cardCount, setCardCount] = useState(0);
    //타이머
    const [time, setTime] = useState(0);
    //객관식
    const [choice, setChoice] = useState([]);
    //객관식 문항
    const [choiceList, setChoiceList] = useState([]);
    //주관식
    const [subjective, setSubjective] = useState([]);
    //정답 목록
    const [right, setRight] = useState([]);
    //오답 목록
    const [wrong, setWrong] = useState([]);

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
                    imgSrc : item.imgSrc
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
                    imgSrc : item.imgSrc
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

    return(
        <>
            {
                choice.length === 0 && subjective.length === 0 &&
                <>
                    <h2>제한 시간 내에 풀지 못했을 경우 빈칸은 오답 처리 됩니다.</h2>
                    {/* 카드의 총 갯수가 4개 미만인 경우 객관식 지원 안함. */}
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
            {/* 객관식 출력 */}
            {
                choice.length !== 0 && choice.map((item,i) => {
                    return (
                        <>
                            <span>{item.question}</span><br/>
                            {/* 객관식 문항 */}
                            {
                                choiceList.map((choice,j) => {
                                    if(i===j){
                                        return (
                                            <>
                                                <input type="radio" name={item.question_no} value={choice.answer1}/>{choice.answer1}<br/>
                                                <input type="radio" name={item.question_no} value={choice.answer2}/>{choice.answer2}<br/>
                                                <input type="radio" name={item.question_no} value={choice.answer3}/>{choice.answer3}<br/>
                                                <input type="radio" name={item.question_no} value={choice.answer4}/>{choice.answer4}<br/>
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
                subjective.length !== 0 && subjective.map((item,i) => {
                    return(
                        <div>
                            {item.question}<br/>
                            {item.answer}<br/>
                            <input type="text"/>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Test;