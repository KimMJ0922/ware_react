import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import ProfileView from './ProfileView';

const Set=()=>{
  const [cardSet, setCardSet] = useState([]);
  useEffect(()=>{
    const getList = async() => {
      let url = "http://localhost:9000/getcardsetlist"
      try{
        let list = await axios.post(url,{no : window.sessionStorage.getItem('no')});
        let listData = list.data;
        listData.map((item,idx)=>{
          cardSet.push({
            title : item.title,
            comment : item.comment,
            open_scope : item.open_scope,
            update_scope : item.update_scope,
            createday : item.createday
          });
          console.log(cardSet);
        });
      }catch(e){
          console.log(e);
      }
      setCardSet([...cardSet]);
    }

    getList();
  },[])

  var date = "";
  var count = 0;
  var text = "";
  return(
      <div className="sq_body">
  <Grid container>
    <ProfileView/>
    {/* 세트가 없을때 */}
    {
      cardSet.length === 0 &&
      <Grid item md={12} xs={12}>
        <Paper>
          <div className="sq_content_off" style={{boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
          <span className="sq_content_font1_off">데이터가 없을때</span>
            <span className="sq_content_font1_off">아직 세트를 생성하지 않았습니다.</span>
            <span className="sq_content_font2_off">학습 세트를 만들어 원하시는 주제를 학습해 보세요.</span>
            <button type="button" className="sq_content_btn_off">세트 만들기</button>
          </div>
        </Paper>
      </Grid>
    }
      {/* 세트가 있을때 */}
      <Grid item md={12} xs={12}>
        <Paper>
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
                console.log(item.createday);
                return (
                  <div>
                    {/* <p className="sq_timeset">{item.createday}</p> */}
                    {
                      text
                    }
                    <div className="sq_on_cnt" style={{backgroundColor:'white',
                        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                      <sapn className="sq_on_txt1">단어수</sapn>
                      <sapn className="sq_on_txt2">세트 제목: {item.title}</sapn>         
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Paper>
      </Grid>

    </Grid> 
    </div>
  )
}
export default Set;