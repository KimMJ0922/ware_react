import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import ProfileView from './ProfileView';
import { Link } from 'react-router-dom';

const Guild=()=>{
    return(
        <div className="gld_body">
        <Grid container>
          <ProfileView/>
          {/* 클래스가 없을때 */}
            <Grid xs={12} md={12}>
                <Paper>
                <div className="gld_no_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                         <span className="gld_no_font1">클래스를 만들거나 참여하지 않았습니다.</span><br/>
                         <span className="gld_no_font2">클래스를 만들어 세트를 정리하고</span><br/>
                         <span className="gld_no_font2">반 친구들과 공유하세요</span><br/>
                         <Link to='/home/Guild_sch'><span className="gld_no_btn">클래스 만들기</span></Link>
                         </div>
                </Paper>
            </Grid>
            {/* 클래스 있을때 */}
            <Grid xs={12} md={12}>
                <Paper>
                <div className="gld_on_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                      <p className="gld_on_box_top">(0)세트 | (0)멤버</p>
                      <p className="gld_on_box_butm">
                        <img src='' alt='d'/> &nbsp; 클래스이름
                      </p>
                  </div>
                </Paper>
            </Grid>
          </Grid>    
        </div>
    )
}
export default Guild;