import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import ProfileView from './ProfileView';

const Test1=[1,2,3];
const Set=()=>{

    return(
        <div className="sq_body">
    <Grid container>
      <ProfileView/>
        {/* 세트가 없을때 */}
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

        {/* 세트가 있을때 */}
        <Grid item md={12} xs={12}>
          <Paper>
            <div className="sq_content_on" style={{height:'100%'}}>
              <p>데이터가 있을 때</p>
              <p className="sq_timeset">시간 나타낼 곳</p>
              {Test1.map(text =>(
                <div className="sq_on_cnt" style={{backgroundColor:'white',
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