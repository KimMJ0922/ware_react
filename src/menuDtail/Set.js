import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import img1 from './iu03.jpg';
import './MenuDtail.css';


const Test1=[1,2,3];
const Set=()=>{

  
    return(
        <div className="sq_body">
    <Grid container spacing={3}>
        <Grid item md={2} xs={2} >
          <Paper>
              <img src={img1} alt="" className="sq_proimg"/>
              </Paper>
        </Grid>
        <Grid item md={6} xs={6}>
          <Paper>
              <span className="sq_id">아이디 들어갈 자리</span>
          </Paper>
          <Paper> 
              <div style={{border:'2px solid #dadee0',marginLeft:'20px',marginTop:'20px'}} className="sq_btn_box">
                <button className="sq_btn" type="button">최근(Home)</button>
                <button className="sq_btn" type="button">만든 세트(Set)</button>
                <button className="sq_btn" type="button">학습한(Set)</button>
                </div>
          </Paper>
        </Grid>
        
        <Grid item md={4} xs={4}>
          <Paper>
          <span className="sq_entity">이름 들어가긴 좀 그렇고 .. 뭔가 넣거나 아예 빼거나</span>
          </Paper>
        </Grid>

        {/* 세트가 없을때 */}
        <Grid item md={12} xs={12}>
          <Paper>
            <div className="sq_content_off" style={{height:'100%'}}>
            <span className="sq_content_font1_off">데이터가 없을때</span>
             <span className="sq_content_font1_off">아직 세트를 생성하지 않았습니다.</span>
             <span className="sq_content_font2_off">학습 세트를 만들어 원하시는 주제를 학습해 보세요.</span>
             <button type="button" className="sq_content_btn_off">세트 만들기</button>
            </div>
          </Paper>
        </Grid>

        {/* 세트가 있을때 */}
        <Grid item md={12} xs={12}>
          <Paper>
            <div className="sq_content_on" style={{height:'100%'}}>
              <p>데이터가 있을 때</p>
              <p className="sq_timeset">시간 나타낼 곳</p>
              {Test1.map(text =>(
                <div className="sq_on_cnt" style={{marginBottom:'15px',backgroundColor:'white',paddingLeft:'20px',paddingTop:'20px',
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                  <sapn className="sq_on_txt1">단어수</sapn>
                  <sapn className="sq_on_txt2">세트 제목: {text}</sapn>

                  
                 
                
                </div>
                ))}
                
                 
            </div>
          </Paper>
        </Grid>

      </Grid> 
      </div>
    )
}
export default Set;