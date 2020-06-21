import React,{useState,useEffect, useReducer} from 'react';
import axios from 'axios';
import { AudioAnalyser } from 'three';
import { relativeTimeRounding } from 'moment';

const Study=({location})=>{
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
  const [email, setEmail] = useState('');
  const [cnt, setCnt] = useState(0);
  //false면 문제, true면 답
  const [cardState, setCardState] = useState(false);
  //수동 자동 상태 확인용
  const [settingCheck, setSettingCheck] = useState(false);
  //자동 했을 때 시간
  const [timer, setTimer] = useState(0)
  const [saveTimer,setSaveTimer] = useState(0);

  //페이지가 불러와지면 처음 실행
  useEffect(()=>{
    let url = location.pathname;
    //카드 세트의 번호 가져오기
    var no = url.substring(url.lastIndexOf('/')+1,url.length);
    url = "http://localhost:9000/getcardlist"

    const getCard = async() =>{
      try{
        let list = await axios.post(url,{no});
        let mem = list.data.mdto
        let cardSet = list.data.csdto;
        let card = list.data.cList;

        setMemberInfo({...mem});
        setCardSetInfo({...cardSet});
        card.map((item,i) => {
          let data = {
            cardset_no : item.cardset_no,
            question_no : item.question_no,
            question : item.question,
            answer : item.answer,
            imgFile : item.imgFile
          }
          cardList.push(data);
        })
        setEmail(mem.email);
      }catch(e){
        console.log(e);
      }
    }
    getCard();
  },[]);

  /*
    이메일 정보 가리기
  */
  useEffect(()=>{
    let emailText = email;
    //아이디가 이메일 형태
    if(memberInfo.provider === 'default'){
      let emailPre = email.substr(0,email.indexOf('@'));
      let emailSuf = email.substr(email.indexOf('@')+1,email.length);
      emailPre = emailPre.replace(emailPre.substr(parseInt(emailPre.length/2),emailPre.length,'*****'));
      emailText = emailPre+emailSuf;
    }
    //소셜 아이디
    else{
      let emailPre = email.substr(0,parseInt(email.length/2));
      emailPre = emailPre.replace(emailPre.substr(parseInt(emailPre.length/2),emailPre.length),'*****');
      emailText = emailPre;
    }
    setMemberInfo({...memberInfo,email : emailText});
  },[email]);

  //다음 버튼
  const cntUp = () => {
    let maxLength = cardList.length-1;
    setCardState(false);
    if(cnt >= maxLength){
      setCnt(0)
    }else{
      setCnt(cnt+1);
    }

    if(settingCheck){
      timerActive();
      setTimer(saveTimer);
    }
  }

  //이전 버튼
  const cntDown = () => {
    let maxLength = cardList.length-1;
    setCardState(false);
    if(cnt <= 0){
      setCnt(maxLength);
    }else{
      setCnt(cnt-1);
    }
  }

  //카드 클릭시
  const cardClick = () => {
    if(cardState === true){
      cntUp();
    }
    setCardState(!cardState);
  }

  //수동 자동 상태 변경
  const changeSettingCheck = (e) => {
    setSettingCheck(!settingCheck);    
  }

  var inter = '';
  useEffect(() => {
    if(settingCheck){
      setTimer(5);
      setSaveTimer(5);
    }
    
    console.log(timer);
  },[settingCheck]);

  //타이머 설정
  const setTime = (e) => {
    setTimer(parseInt(e.target.value));
    setSaveTimer(parseInt(e.target.value));
    timerActive();
  }
  var t = '';
  const timerActive = () => {
    clearTimeout(t);
  }
  useEffect(()=>{
    if(settingCheck){
      //console.log(timer);
      t = setTimeout(() => {
        if(timer === 0 ){
          setTimer(saveTimer);
          if(cardState){
            cntUp();
          }else{
            setCardState(!cardState);
          }
        }else{
          setTimer(timer-1);
        }
        //console.log(timer);
      },1000);
      
    }
  },[timer]);


  //카드 삭제
  const deleteCardSet = () => {
    let check = window.confirm("삭제하시겠습니까?");
    if(!check) return false;
 
    let url = "http://localhost:9000/deletecardset";
    axios.post(url,{
      no : cardSetInfo.no
    }).then((res) => {
      window.location.replace("/home/set");
    }).catch((err) => {

    })
  }
  var maxCard = cardList.length;
  return(
      <>
        <div>
          <h2>{cardSetInfo.title}</h2>
          <h3>{cardSetInfo.comment}</h3>
        </div>
        <div>
          {/* 카드 세트 만든 사람 정보 */}
          <img src={memberInfo["profile"]} alt="" style={{width:'80px', height:'80px'}}/>
          <img src={
            memberInfo["provider"] === 'default' ? '/profile/ware.png' : memberInfo["provider"] === 'kakao' ? '/profile/kakao.png' : '/profile/google.png'
          } alt="" style={{width:'20px', height:'20px'}}/>
          {memberInfo["name"]}
          ({memberInfo["email"]})
        </div>
        <div>
          <button type="button">학습하기</button>
          <button type="button">객관식</button>
          <button type="button">주관식</button>
        </div>
        <div>
          {
            settingCheck === false ? <button type="button" onClick={cntDown} style={{float:'left'}}>이전</button> : ''
          }
          
          {
            cardList.map((item,i) => {
              if(cnt === i){
                return (
                  <>
                    {/* div 클릭시 cardState 상태를 반전 시킴 */}
                    <div onClick={settingCheck === false ? cardClick : null} style={{width:'400px', height:'300px', border:'1px solid gray', textAlign:'center', float:'left'}}>
                      {/* 이미지가 있으면 화면에 출력 */}
                      {
                        item.imgFile !== "" && cardState === false && <img src={item.imgFile} alt="" style={{width:'150px', height:'150px'}}/>
                      }
                      <br/>
                      {/* cardState가 false면 문제를 보여주고, cardState가 true면 답을 보여준다. */}
                      {
                        cardState === false ? item.question : item.answer
                      }
                    </div>
                  </>
                )
             }
            })
          }

          {
            settingCheck === false ? <button type="button" onClick={cntUp} style={{float:'left'}}>다음</button> : ''
          }
          
        </div>
        <div style={{clear:'both'}}>
          {
            (cnt+1)+"/"+maxCard
          }
          {
            settingCheck === true && <div style={{width : 300-(timer*(300/saveTimer)), height:'5px',backgroundColor:'black',transition:'0.5s'}}/>
          }
          <br/>
          {
            settingCheck === true && timer+"초"
          }
        </div>
        <div style={{clear:'both'}}>
          <h3>설정</h3>
          <input type="radio" name="settimg" value="수동" onChange={changeSettingCheck} checked={settingCheck === false ? 'true' : ''}/>수동
          <input type="radio" name="settimg" value="자동" onChange={changeSettingCheck} checked={settingCheck === true ? 'true' : ''}/>자동
        </div>
        {
          settingCheck === true &&
          <div>
            <select id="timer" onChange={setTime}>
              <option value="5">5초</option>
              <option value="10">10초</option>
              <option value="15">15초</option>
              <option value="30">30초</option>
            </select>
          </div>
        }
        <div style={{clear:'both'}}>
          <button type="button">수정</button>
          {/* 삭제 버튼 */}
          {
            parseInt(memberInfo.no) === parseInt(window.sessionStorage.getItem('no')) ? <button type="button" onClick={deleteCardSet}>삭제</button> : ""
          }
        </div>
      </>
  )
}
export default Study;