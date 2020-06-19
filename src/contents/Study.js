import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Study=({location})=>{
  const [memberInfo, setMemberInfo] = useState({
    no : '',
    name : '',
    email : '',
    profile : '',
    provider : ''
  });
  const [memberInfoChange, setMemberInfoChange] = useState(false);
  const [cardSetInfo, setCardSetInfo] = useState({
    title : '',
    comment : '',
    open_scope : '',
    update_scope : ''
  });
  const [cardSetInfoChange, setCardSetInfoChange] = useState(false);
  const [cardList, setCardList] = useState([]);


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
        setMemberInfo({mem});
        setCardSetInfo({cardSet});
        setMemberInfoChange(true);
        // setCardSetInfo(list.data.csdto);
        // let cList = list.data.cList;
        // cList.map((item) => {
        //   setCardList(cardList.concat(item));
        // })
      }catch(e){
        console.log(e);
      }
    }
    // const getCard = () => {
    //   axios.post(url,{no})
    //   .then((res)=>{
    //     console.log(res.data);
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // }
    getCard();
    setMemberInfo(memberInfo);
    
    
  },[]);

  useEffect(()=>{
    setMemberInfo(memberInfo.mem);
    console.log(memberInfo);
  },[memberInfoChange]);

  return(
      <div>
        {}
      </div>
  )
}
export default Study;