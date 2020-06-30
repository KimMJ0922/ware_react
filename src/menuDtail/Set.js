import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import {useHistory} from 'react-router'
import ProfileView from './ProfileView';
import { Link } from 'react-router-dom';
import './Set.css';

const Set=()=>{
  var history = useHistory();
  const [cardSet, setCardSet] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [start, setStart] = useState(0);
  useEffect(()=>{
    const getList = async() => {
      let url = "http://localhost:9000/getcardsetlist"
      try{
        let list = await axios.post(url,{
          no : window.sessionStorage.getItem('no'),
          start
        });
        let listData = list.data;
        listData.map((item,idx)=>{
          cardSet.push({
            no : item.no,
            title : item.title,
            comment : item.comment,
            open_scope : item.open_scope,
            update_scope : item.update_scope,
            createday : item.createday,
            cnt : item.cnt,
          });
        });
      }catch(e){
          console.log(e);
      }
      setStart(start+5);
      setCardSet([...cardSet]);
    }

    //총 갯수 구하기
    const getCnt = async() => {
      let url = "http://localhost:9000/getsetcount"
      try{
        let cnt = await axios.post(url,{no : window.sessionStorage.getItem('no')});
        setTotalCnt(cnt.data);
      }catch(e){
          console.log(e);
      }
    }

    getList();
    getCnt();
  },[])

  const goCreateCardSet = () => {
    history.push("/create");
  }
  
  const checkPass = (e) => {
    e.preventDefault();
    let pass = window.prompt("비밀번호를 입력하세요");
    let url = "http://localhost:9000/cardsetpasscheck";
    let no = e.target.id
    axios.post(url,{
      no,
      open_password : pass
    }).then((res)=>{
      if(res.data){
        window.sessionStorage.setItem('cardset_no',no);
        window.sessionStorage.setItem('study','cardset');
        setStudy();
        history.push('/study');
      }else{
        alert("비밀번호가 맞지 않습니다.");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  //Root쪽에 있는 no를 변경 시키고 페이지 이동
  //페이지 이동 할 때 window.location.href, replace로 가면 새로고침 되어
  //useState값이 초기화 됨
  //그러기 때문에 router에 있는 useHistory로 이동해야 유지됨.
  const linkClick = (e) => {
    e.preventDefault();
    let id = e.target.id;
    setTimeout(() => {
      window.sessionStorage.setItem('cardset_no',id);
      window.sessionStorage.setItem('study','cardset');
      setStudy();
      history.push('/study');
    },100)
    
  }

  //학습 저장
  const setStudy = () => {
    let url = "http://localhost:9000/setstudy";

    axios.post(url,{
      cardset_no : window.sessionStorage.getItem('cardset_no'),
      member_no : window.sessionStorage.getItem('no'),
      category : window.sessionStorage.getItem('study')
    }).then((res) => {

    }).catch((err) => {
      console.log(err);
    })
  }

  //더보기 버튼
  const moreCardSetList = () => {
    if(start>totalCnt){
      return false;
    }
    setStart(start+5);
    
    let url = "http://localhost:9000/getcardsetlist"
    axios.post(url,{
      no : window.sessionStorage.getItem('no'),
      start
    }).then((res) => {
      let data = res.data;
      data.map((item,idx)=>{
        cardSet.push({
          no : item.no,
          title : item.title,
          comment : item.comment,
          open_scope : item.open_scope,
          update_scope : item.update_scope,
          createday : item.createday,
          cnt : item.cnt,
        });
       setCardSet([...cardSet]);
      });

    }).catch((err) => {
      console.log(err);
    });
  }
  var date = "";
  var count = 0;
  var text = "";
  return(
      <div>
        <Grid container>
          {/* 세트가 없을때 */}
          {
            cardSet.length === 0 &&
            <Grid item md={12} xs={12}>
              <Paper>
                <div className="sq_content_off" style={{boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                  <span className="sq_content_font1_off">아직 세트를 생성하지 않았습니다.</span>
                  <span className="sq_content_font2_off">학습 세트를 만들어 원하시는 주제를 학습해 보세요.</span>
                  <button type="button" className="sq_content_btn_off" onClick={goCreateCardSet}>세트 만들기</button>
                </div>
              </Paper>
            </Grid>
          }
          {/* 세트가 있을때 */}
          <Grid item md={12} xs={12}>
            <Paper>
              <div>
              </div>
              <div className="sq_content_on" style={{height:'100%'}}>    
                {
                  cardSet.length !== 0 &&
                  cardSet.map((item,idx) =>{
                    //같은 날짜 묶기
                    //처음 실행하면 출력
                    if(idx === 0){
                      date = item.createday;
                      text = <p className="sq_timeset">{date}</p>;
                    }
                    //2번째부터 검사 시작
                    else{
                      //idx -1의 날짜랑 현재 날짜가 다르면 텍스트를 바꿔서 출력
                      if(date !== item.createday){
                        date = item.createday;
                        text = <p className="sq_timeset">{date}</p>;
                      }
                      //idx -1과 idx의 날짜가 같으면 출력 안함
                      else{
                        text = '';
                      }
                    }
                    return (
                      <div>
                        {/* 날짜 출력 같은 날짜면 출력 안하고 다르면 출력함 */}
                        {
                          text
                        }
                        <Link to="" onClick={item.open_scope === "public" ? linkClick : item.open_scope === "private" ? linkClick : checkPass}>                       
                          <div className="sq_on_cnt" style={{backgroundColor:'white', 
                              boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}} id={item.no}>
                            <span className="sq_on_txt_cnt" id={item.no}>{item.cnt} 단어</span>

                            <div className="sq_on_title_box" id={item.no} style={{backgroundColor:'white'}}>
                            <sapn className="sq_on_txt2" id={item.no}>{item.title}</sapn>
                             {
                                item.open_scope === "public" ? 
                                <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                item.open_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                              }
                              {
                                item.update_scope === "public" ? <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                item.update_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                              }               
                            <sapn className="sq_on_txt1" id={item.no}>{item.comment}</sapn>
                            </div>         
                          </div>
                        </Link>
                      </div>
                    )
                  })
                }
                <button type="button" className="sq_on_more_btn" onClick={moreCardSetList}>더보기</button>
              </div>
            </Paper>
          </Grid>
        </Grid> 
      </div>
  )
}
export default Set;