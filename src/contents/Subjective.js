import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';

const Subjective = () => {
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
                        answer : item.answer,
                        category : '주관식'
                    });
                }else{
                    setWrongAnswer(wrongAnswer+1);
                    wrongNum.push(random);
                    wrong.push({
                        question_no : item.question_no,
                        question : item.question,
                        userAnswer : inputText,
                        answer : item.answer,
                        category : '주관식'
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
            method : 'subjective',
            right,
            wrong
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            총 갯수 : {cardList.length}<br/>
            맞은 횟수 : {rightAnswer}<br/>
            틀린 횟수 : {wrongAnswer}<br/>
            {
                cardList.length !== rightAnswer+wrongAnswer && cardList.map((item,i) => {
                    if(i === random){
                        return (
                            <>
                                <img src={item.imgSrc} alt="" style={{width:'150px', height:'150px'}}/>
                                {item.question}<br/>
                                <input type="text" onChange={textChange} onKeyPress={keyEnter} value={inputText} autoFocus="true"/><button type="button" onClick={btnClick}>입력 완료</button>
                            </>
                        )
                    }
                })
            }

            {
                cardList.length === rightAnswer+wrongAnswer && 
                <>
                    <button type="button" onClick={answerShow} name="right">정답</button>
                    <button type="button" onClick={answerShow} name="wrong">오답</button>
                    <button type="button" onClick={retry}>다시 풀기</button>
                    <h3>{answerCheck === false ? "오답 목록" : "정답 목록"}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>문제 번호</th>
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
                                            <td>{item.question_no}</td>
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
                                            <td>{item.question_no}</td>
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
        </>
    )
}

export default Subjective;