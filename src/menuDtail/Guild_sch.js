import React from 'react';
import { Grid, Modal, Paper } from '@material-ui/core';

const Guild_sch=()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <>
            <div className="gld_sch_body">
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <div className="gld_sch_box">
                        <p className="gld_sch_font1">클래스 만들기 / 참여하기</p>
                        <input className="gld_sch_input" type="text" placeholder="클래스이름을 검색하세요"/>
                        <p className="gld_sch_add_btn" onClick={handleOpen}>클래스 만들기</p>
                        </div>
                    </Grid>
                </Grid>
            </div>     
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <div className="gld_sch_modal">
                <p className="gld_sch_mo_font1">클래스 만들기</p>
                
                <div className="gld_sch_input_box">
                    <p>클래스 이름</p>
                    <input className="gld_sch_mo_input" type="text" placeholder="당신만의 특별한 클래스 이름을 만들어 보세요."/>
                    <p>설명</p>
                    <input className="gld_sch_mo_input" type="text" placeholder="클래스를 설명해보세요."/>
                </div>
                <button className="gld_sch_mo_sbm_btn" type="submit">클래스 만들기</button>
            </div>
            </Modal> 
        </>
    )
}
export default Guild_sch;