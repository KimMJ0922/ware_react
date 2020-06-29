import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import {useHistory} from 'react-router'
import { Link } from 'react-router-dom';
import './Set.css';

const BoardSet=()=>{
  var history = useHistory();
  const [cardSet, setCardSet] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [start, setStart] = useState(0);
  useEffect(()=>{
    const getList = async() => {
      let url = "http://localhost:9000/board/BoardSetList"
      try{
        let list = await axios.post(url,{
          no : window.sessionStorage.getItem('no'),
          start
        });
        let listData = list.data;
        console.log(listData);
        listData.map((item,idx)=>{
          cardSet.push({
            no : item.board_no,
            title : item.subject,
            comment : item.content,
            createday : item.buy_day.slice(0,10),
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
      let url = "http://localhost:9000/board/PurchaseListCount?no="+window.sessionStorage.getItem('no')
      try{
        let cnt = await axios.get(url);
        setTotalCnt(cnt.data);
      }catch(e){
          console.log(e);
      }
    }

    getList();
    getCnt();
  },[])

  const goCreateCardSet = () => {
    history.push("/home/board");
  }
  
  const linkClick = (e) => {
    e.preventDefault();
    let id = e.target.id;
    setTimeout(() => {
      window.sessionStorage.setItem('cardset_no',id);
      window.sessionStorage.setItem('study','board');
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
    let url = "http://localhost:9000/board/BoardSetList"
    axios.post(url,{
      no : window.sessionStorage.getItem('no'),
      start
    }).then((res) => {
      let data = res.data;
      data.map((item,idx)=>{
        cardSet.push({
          no : item.board_no,
          title : item.subject,
          comment : item.content,
          createday : item.buy_day.slice(0,10),
          cnt : item.cnt,
        });
       setCardSet([...cardSet]);
      });

    }).catch((err) => {
      console.log(err);
    });
  }
  var date = "";
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
                  <span className="sq_content_font1_off">아직 세트를 구매하지 않았습니다.</span>
                  <span className="sq_content_font2_off">학습 세트를 구매하여 원하시는 주제를 학습해 보세요.</span>
                  <button type="button" className="sq_content_btn_off" onClick={goCreateCardSet}>구매하러 가기</button>
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
                        {/* 
                          div에 e.target이 안먹힌다.
                          a 태그도 마찬가지 
                        */}
                        <Link to="" onClick={linkClick}>                       
                          <div className="sq_on_cnt" style={{backgroundColor:'white', 
                              boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}} id={item.no}>
                            <span className="sq_on_txt_cnt" id={item.no}>{item.cnt} 단어</span>
                            <div className="sq_on_title_box" id={item.no}>
                            <sapn className="sq_on_txt2" id={item.no}>{item.title}</sapn>              
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
export default BoardSet;