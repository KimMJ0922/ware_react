import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';

const Choice = () => {
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
            let url = "http://localhost:9000/getcardchoicelist"
            try {
                let list = await axios.post(url,{no : cardset_no});
                let choiceList = list.data.choiceList;
                let mem = list.data.mdto
                let cardSet = list.data.csdto;
                let card = list.data.cList;
                setChoiceList([...choiceList]);
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
                        answer : item.answer
                    });
                }else{
                    setWrongAnswer(wrongAnswer+1);
                    wrongNum.push(random);
                    wrong.push({
                        question_no : item.question_no,
                        question : item.question,
                        userAnswer : value,
                        answer : item.answer
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
    return (
        <>
            {
                cardList.length !== rightAnswer+wrongAnswer && cardList.map((item,i) => {
                    if(i === random){
                        return (
                            <>
                                <img src={item.imgSrc} alt="" style={{width:'150px', height:'150px'}}/>
                                {item.question}<br/>
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

export default Choice;