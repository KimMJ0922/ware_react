import React,{useState,useEffect, useReducer} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import UpdateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import BookIcon from '@material-ui/icons/MenuBook';
import MouseIcon from '@material-ui/icons/Mouse';
import TestIcon from '@material-ui/icons/Flag';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import './Study.css';
import { AudioAnalyser } from 'three';
import { relativeTimeRounding } from 'moment';
import { red } from '@material-ui/core/colors';
import { Hidden } from '@material-ui/core';

const Study=({location})=>{
  var routerHistory = useHistory();
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

    //카드 세트의 번호 가져오기
    var no = window.sessionStorage.getItem('cardset_no');
    let url = "http://localhost:9000/getcardlist"

    const getCard = async() =>{
      try{
        if(no === null || no === 'null' || no === ''){
          routerHistory.go(-1);
        }

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
            imgSrc : item.imgSrc
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
      routerHistory.replace("/home/set");
    }).catch((err) => {

    })
  }

  //수정 버튼 클릭 시
  const privateUpdate = () => {
    routerHistory.push("/modify");
  } 

  const memberUpdate = () => {
    let pass = window.prompt("수정 비밀번호를 입력해주세요");
    let url = "http://localhost:9000/updatepasscheck";

    axios.post(url,{
      no : cardSetInfo.no,
      update_password : pass
    }).then((res) => {
      if(res.data){
        routerHistory.push("/modify/");
      }
    }).catch((err) => {

    });
  }

  //주관식으로 이동
  const Subjective = () => {
    routerHistory.push('/subjective');
  }

  //객관식 이동
  const Choice = () => {
    routerHistory.push('/choice');
  }
  var maxCard = cardList.length;
  return(
      <>
      <div className="std_body">
        {/* top 컨테이너 */}
      <Grid container>
        <Grid item xs={12} md={12}>
          <p className="std_title_font">{cardSetInfo.title}</p>
        </Grid>
      </Grid>
      <Grid container>
        <Hidden only={['xs','sm']}>
          <Grid xs={12} md={4}>
            <div className="std_menu_box">
            <p>문제 풀기</p>
            <button type="button"><BookIcon/>학습하기</button>
            <button type="button" onClick={Choice}><MouseIcon/>객관식</button>
            <button type="button" onClick={Subjective}><KeyboardIcon/>주관식</button>
            <button type="button"><TestIcon/>테스트</button>
            <p>설정</p>   
             {/* 수정 버튼 */}
            <button type="button" onClick={cardSetInfo.update_scope === "member" ? memberUpdate : privateUpdate}><UpdateIcon/>수정</button>
              {/* 삭제 버튼 */}
              {
                parseInt(memberInfo.no) === parseInt(window.sessionStorage.getItem('no')) ? <button type="button" onClick={deleteCardSet}><DeleteIcon/>삭제</button> : ""
              }
              <p>수동 / 자동</p>
          <div className="std_radio_box">         
            <input type="radio" name="settimg" value="수동" onChange={changeSettingCheck} checked={settingCheck === false ? 'true' : ''}/>수동
            <input type="radio" name="settimg" value="자동" onChange={changeSettingCheck} checked={settingCheck === true ? 'true' : ''}/>자동
            </div>
            {
          settingCheck === true &&
            <select id="timer" onChange={setTime}>
              <option value="5">5초</option>
              <option value="10">10초</option>
              <option value="15">15초</option>
              <option value="30">30초</option>
            </select>
            }
            </div>
          </Grid>
          </Hidden>
          <Grid xs={12} md={8}>
          {
            cardList.map((item,i) => {
              if(cnt === i){
                return (
                  <>
                  <div className="std_content_box">
                    {/* div 클릭시 cardState 상태를 반전 시킴 */}
                    <div className="std_contetn_prev">
                        {
                          settingCheck === false ? <button type="button" onClick={cntDown}><PrevIcon/></button> : ''
                        }
                    </div>
                    <div className="std_content" onClick={settingCheck === false ? cardClick : null}>
                      {/* 이미지가 있으면 화면에 출력 */}
                      {/* cardState가 false면 문제를 보여주고, cardState가 true면 답을 보여준다. */}
                      {
                        cardState === false ? item.question : item.answer
                      }
                      {
                        item.imgSrc !== "" && cardState === false && <img src={item.imgSrc} className="std_content_img" alt=""/>
                      }               
                   </div>
                   <div className="std_contetn_next">
                        {
                            settingCheck === false ? <button type="button" onClick={cntUp}><NextIcon/></button> : ''
                          }
                    </div>
                   <div style={{clear:'both'}}>
                          {
                            settingCheck === true && <div className="std_content_provar" 
                            style={{width : 600-(timer*(600/saveTimer)),transition:'0.5s'
                          
                          }}/>
                          }
                            <div className="std_content_cnt">
                              {
                                (cnt+1)+"/"+maxCard
                              }
                            </div>
                          {
                            settingCheck === true && timer+"초"
                          }
                      </div>
                    </div>
                  </>
                )
             }
            })
          }
          </Grid>
      </Grid>
      <hr className="std_hr"></hr>
      <Grid container>
        <Grid xs={6} md={6}>
        <span className="std_com_font">Comment / {cardSetInfo.comment}</span>
        </Grid>
        <Grid xs={6} md={6}>
        <div className="std_user_box"> <img src={memberInfo["profile"]} alt=""/>  {memberInfo["name"]} {/* 카드 세트 만든 사람 정보 */}
          <img src={
            memberInfo["provider"] === 'default' ? '/profile/ware.png' : memberInfo["provider"] === 'kakao' ? '/profile/kakao.png' : '/profile/google.png'
          } alt="" style={{width:'20px', height:'20px'}}/>
          <input type="text" className="gu_ka_text" value={memberInfo["email"]} maxLength='5' readOnly/>    
        </div> 
          </Grid>
      </Grid>
          <Hidden only={['md','lg','xl']}>
      <Grid xs={12}>
            <div className="std_menu_box">
            <p>문제 풀기</p>
            <button type="button"><BookIcon/>학습하기</button>
            <button type="button"><MouseIcon/>객관식</button>
            <button type="button"><KeyboardIcon/>주관식</button>
            <button type="button"><TestIcon/>테스트</button>
            <p>설정</p>   
             {/* 수정 버튼 */}
           <button type="button" onClick={cardSetInfo.update_scope === "member" ? memberUpdate : privateUpdate}><UpdateIcon/>수정</button>
              {/* 삭제 버튼 */}
              {
                parseInt(memberInfo.no) === parseInt(window.sessionStorage.getItem('no')) ? <button type="button" onClick={deleteCardSet}><DeleteIcon/>삭제</button> : ""
              }
              <p>수동 / 자동</p>
          <div className="std_radio_box">         
            <input type="radio" name="settimg" value="수동" onChange={changeSettingCheck} checked={settingCheck === false ? 'true' : ''}/>수동
            <input type="radio" name="settimg" value="자동" onChange={changeSettingCheck} checked={settingCheck === true ? 'true' : ''}/>자동
            </div>
            {
          settingCheck === true &&
            <select id="timer" onChange={setTime}>
              <option value="5">5초</option>
              <option value="10">10초</option>
              <option value="15">15초</option>
              <option value="30">30초</option>
            </select>
            }
            </div>
          </Grid>
          </Hidden>
   </div>
 </>
  )
}
export default Study;