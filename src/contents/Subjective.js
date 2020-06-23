import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Subjective = () => {
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
    const [saveNum, setSaveNum] = useState([]);
    const [rightAnswer, setRightAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const randomNum = () => {
        while(true){
            if(cardList.length === saveNum.length){
                break;
            }
            let ran = Math.random();
            let ransu = Math.floor(ran*cardList.length);
            if(saveNum.indexOf(ransu) === -1){
                console.log('랜덤 : '+ransu);
                setRandom(ransu);
                break;
            }
            
        }
    }
    useEffect(() => {
        const getCardSet = async() => {
            let url = "http://localhost:9000/getcardlist"
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
                    saveNum.push(random);
                    randomNum();
                }else{
                    setWrongAnswer(wrongAnswer+1);
                    randomNum();
                }
            }
        });
    }
    return (
        <>
            총 갯수 : {cardList.length}<br/>
            맞은 횟수 : {rightAnswer}<br/>
            틀린 횟수 : {wrongAnswer}<br/>
            {
                cardList.length !== saveNum.length && cardList.map((item,i) => {
                    if(i === random){
                        return (
                            <>
                                <img src={item.imgSrc} alt="" style={{width:'150px', height:'150px'}}/>
                                {item.question}<br/>
                                <input type="text" onChange={textChange} value={inputText}/><button type="button" onClick={btnClick}>입력 완료</button>
                            </>
                        )
                    }
                })
            }

            {
                cardList.length === saveNum.length && <span>다풀었다.</span>
            }
        </>
    )
}

export default Subjective;