import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router'

const Test = (props) => {
    var history= useHistory();
    const [cardList, setCardList] = useState([]);
    const [setting, setSetting] = useState({
        choice : 0,
        subjective : 0,
        minute : 0,
        second : 0
    });

    const [cardCount, setCardCount] = useState(0);
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

    const settingBtnClick = () => {
        console.log(cardCount);
        if(parseInt(setting.choice)+parseInt(setting.subjective) === 0){
            alert("문제 갯수를 적어주세요");
        }

        if(parseInt(setting.choice)>=cardCount || parseInt(setting.subjective)>=cardCount){
            alert("카드 갯수보다 많습니다.");
        }

        if(parseInt(setting.minute) + parseInt(setting.second) === 0){
            alert("시간을 설정해주세요");
        }
    }
    return(
        <>
        {
            cardList.length === 0 && 
            <>
                <h2>제한 시간 내에 풀지 못했을 경우 빈칸은 오답 처리 됩니다.</h2>
                객관식 : <input type="text" name="choice" onChange={settingChange} value={setting.choice} onFocus={settingFocus} onBlur={settingBlur}/>문제<br/>
                주관식 : <input type="text" name="subjective" onChange={settingChange} value={setting.subjective} onFocus={settingFocus} onBlur={settingBlur}/>문제<br/>
                시간 : <input type="text" name="minute" onChange={settingChange} value={setting.minute} onFocus={settingFocus} onBlur={settingBlur}/>분
                       <input type="text" name="second" onChange={settingChange} value={setting.second} onFocus={settingFocus} onBlur={settingBlur}/>초<br/>
                <button type="button" onClick={settingBtnClick}>설정 완료</button>
            </>
        }
        </>
    )
}
export default Test;