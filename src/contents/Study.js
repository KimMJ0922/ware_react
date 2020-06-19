import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { AudioAnalyser } from 'three';

const Study=({location})=>{
  const [memberInfo, setMemberInfo] = useState({
    no : '',
    name : '',
    email : '',
    profile : '',
    provider : ''
  });
  const [cardSetInfo, setCardSetInfo] = useState({
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
        if(cardSet.open_scope === "member"){
          let pass = window.prompt("비밀번호를 입력하세요");
        }
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
      console.log(emailPre);
      emailPre = emailPre.replace(emailPre.substr(parseInt(emailPre.length/2),emailPre.length),'*****');
      console.log(emailPre);
      emailText = emailPre;
    }

    setMemberInfo({...memberInfo,email : emailText});
  },[email]);

  //다음 버튼
  const cntUp = () => {
    let maxLength = cardList.length-1;
    if(cnt >= maxLength){
      setCnt(0)
    }else{
      setCnt(cnt+1);
    }
    
  }
  //이전 버튼
  const cntDown = () => {
    let maxLength = cardList.length-1;
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
        <div >
          <button type="button" onClick={cntDown} style={{float:'left'}}>이전</button>
          {
            cardList.map((item,i) => {
              console.log(item);
              if(cnt === i){
                return (
                  <>
                    {/* div 클릭시 cardState 상태를 반전 시킴 */}
                    <div onClick={cardClick} style={{width:'400px', height:'300px', border:'1px solid gray', textAlign:'center', float:'left'}}>
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
          <button type="button" onClick={cntUp} style={{float:'left'}}>다음</button>
        </div>
        <div style={{clear:'both'}}>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </>
  )
}
export default Study;