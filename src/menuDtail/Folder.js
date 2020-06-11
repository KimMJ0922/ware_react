import React from 'react';
import ProfileView from './ProfileView';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import { Paper } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// 아이콘
import FolderIcon from '@material-ui/icons/FolderOpenSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';

const Folder=()=>{
    const test= ["안녕하세욘","반갑습니다","조충현","쏠수이써!"];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
//   메뉴
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };
   
    return(
   
        <div className="fdr_body">
            <Grid container>              
                <Grid item xs={12} md={12}>
                      {/* 데이터 없을때 */}
                     <ProfileView/>
                    <Paper>
                        <div className="fdr_no_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                            <span className="fdr_no_font1">회원님은 아직 폴더를 생성하시지 않았습니다.</span><br/>
                            <span className="fdr_no_font2">폴더를 만들어 세트를 정리하세요.</span><br/>
                            <button type="button" onClick={handleOpen} className="fdr_no_btn">폴더 만들기</button>
                        </div>
                    </Paper>
                </Grid> 
                {/* 데이터가 있을때 */}

                <Grid item xs={12} md={12}>
                        <Paper>
                            <div>
                                <p>(0)세트 | (아이디) 만듦</p>
                        
                          </div>
                        </Paper>
                </Grid>

                <Grid item xs={3} md={2}>
                    <Paper>
                    <FolderIcon style={{fontSize:'4rem',marginLeft:'20px'}}/>
                    </Paper> 
                </Grid>

                <Grid item xs={5} md={8}>
                    <Paper>
                    <span className="fdr_on_font1">폴더 제목</span>
                    </Paper> 
                </Grid>

                
                <Grid item xs={4} md={2}>
                    <Paper>
                        <div className="fdr_icon_box">
                            <AddCircleIcon/><MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" onClick={menuClick}/>
                        </div>
                    </Paper> 
                </Grid>

                <Grid item xs={12} md={10}>
                    <Paper>
                    <span>설명 : 폴더가 있을 때 설명입니다</span>
                    </Paper> 
                </Grid>

                <Grid item xs={12} md={12}> 
                        {test.map(sub =>(
                             <div className="fdr_set_box" key={sub} style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                                <p className="fdr_set_box_subject">{sub}</p>
                                <p className="fdr_set_box_count">(count) 개</p>
                                <p className="fdr_set_box_id">userid</p>
                               </div>
                         ))}
                        
                    
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
             <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={menuClose}
                >
       <MenuItem onClick={menuClose}><CreateIcon/>수정</MenuItem>
       <MenuItem onClick={menuClose}><DeleteIcon/>삭제</MenuItem>
        
      </Menu>        
        </div>
        
    )
}
export default Folder;