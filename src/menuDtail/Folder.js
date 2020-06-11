import React from 'react';
import ProfileView from './ProfileView';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import { Paper } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import FolderIcon from '@material-ui/icons/FolderOpenSharp';

const Folder=()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
   
    return(
   
        <div className="fdr_body">
            <Grid container>              
                <Grid item xs={12} md={12}>
                      {/* 데이터 없을때 */}
                     <ProfileView/>
                    <Paper>
                        <div className="fdr_no_box" style={{backgroundColor:'gray'}}>
                            <span className="fdr_no_font1">회원님은 아직 폴더를 생성하시지 않았습니다.</span><br/>
                            <span className="fdr_no_font2">폴더를 만들어 세트를 정리하세요.</span><br/>
                            <button type="button" onClick={handleOpen} className="fdr_no_btn">만들자~</button>
                        </div>
                    </Paper>
                </Grid> 

                <Grid item xs={12} md={2} >
                        <Paper>
                            <div>
                                <p>(0)세트 | (아이디) 만듦</p>
                        
                          </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} md={10}>
                    <Paper>
                    <FolderIcon style={{fontSize:'4rem'}}/>
                    </Paper> 
                </Grid>
                <Grid item xs={8} md={10}>
                    <Paper>
                    <span>폴더 제목</span>
                    </Paper> 
                </Grid>

                <Grid item xs={12} md={10}>
                    <Paper>
                    <span>설명 좌르르르륵좌르르르륵좌르르르륵좌르르르륵좌르르르륵좌르르르륵좌르르르륵</span>
                    </Paper> 
                </Grid>
            </Grid>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
             <div className="fdr_on_modal">
                 <p className="fdr_on_modal_top">새로운 폴더 만들기</p>
                 <div style={{textAlign:'center',marginTop:'30px'}}>
                     <input type="text" className="fdr_on_modal_input" placeholder="폴더명을 입력하세요"/>
                     <input type="text" className="fdr_on_modal_input" placeholder="설명을 입력하세요"/>
                     <button type="submit" className="fdr_on_submit">폴더 만들기</button>
                 </div> 
             </div> 
            </Modal>          
        </div>
        
    )
}
export default Folder;