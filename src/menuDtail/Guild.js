import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

import './MenuDtail.css';
import ProfileView from './ProfileView';

 const test=[1,2,3,4,5,6,7,8,9];
const Guild=()=>{
  const [open2, setOpen2] = React.useState(false);
  const ClassModalOpen = () => {
      setOpen2(true);
    };
  
    const ClassModalClose = () => {
      setOpen2(false);
    };
    return(
        <div className="gld_body">
        <Grid container>
          <ProfileView/>
            <Grid xs={12} md={12}>
                <Paper>
                <div className="gld_no_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                         <span className="gld_no_font1">클래스를 만들거나 참여하지 않았습니다.</span><br/>
                         <span className="gld_no_font2">클래스를 만들어 세트를 정리하고</span><br/>
                         <span className="gld_no_font2">반 친구들과 공유하세요</span><br/>
                         <span onClick={ClassModalOpen} className="gld_no_btn">클래스 만들기</span>
                         </div>
                </Paper>
            </Grid>
          </Grid>

          <Modal
            open={open2}
            onClose={ClassModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
              <p>dddd</p>
             {/* <div className="gld_on_modal"> */}
                  {/* <p className="gld_on_modal_top">클래스 찾기 or 만들기</p>
  
                 <div style={{textAlign:'center',marginTop:'30px'}}>
                     <input type="text" className="gld_on_modal_input" placeholder="폴더명을 입력하세요"/>
                     <input type="text" className="gld_on_modal_input" placeholder="설명을 입력하세요"/>
                     <button type="submit" className="gld_on_submit">폴더 만들기</button>
                     <Paper >
                       <div className="gld_sch_in_box">
                         <span className="gld_sch_font">클래스 검색하기</span>
                        <input type="text" class="gld_sch_input" placeholder="클래스,반 을 검색하세요"/>
                        </div> 
                        {test.map(tst=>(
                          <div className="gld_sch_box">
                            {tst}
                          </div>
                        ))} 
                      </Paper>
                 </div> 
             </div>  */}
            </Modal>  
              
        
        </div>
    )
}
export default Guild;