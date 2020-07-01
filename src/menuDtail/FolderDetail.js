import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import StorefrontIcon from '@material-ui/icons/Storefront';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';

const FolderDetail=(props)=>{
    let history = useHistory();
    let card = props.card;
    let folder_no = props.no;
    let study = props.study;

    const [open4,setOpen5] = React.useState(false);
    const [no,setNo] = useState(0);
    const [pass, setPass] = useState('');
    const Open222 = (no) => {
      setNo(no);
      setOpen5(true);
    };
  
    const Close222 = () => {
      setOpen5(false);
    };

    const goStudy = (cardset_no, open_scope, category) => {
        console.log(cardset_no, open_scope, category);
        if(category === 'cardset'){
            if(open_scope === 'member'){
                Open222(cardset_no);
                //passCheck(cardset_no,pass);
            }else{
                window.sessionStorage.setItem('cardset_no',cardset_no);
                window.sessionStorage.setItem('study','cardset');
                setStudy();
                history.push('/study');
            }
        }else{
            window.sessionStorage.setItem('cardset_no',cardset_no);
            window.sessionStorage.setItem('study','board');
            setStudy();
            history.push('/study');
        }
    }

    const passCheck = () => {
        let url = "http://localhost:9000/cardsetpasscheck";
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

    //비밀번호 입력시
    const changePassword = (e) => {
        setPass(e.target.value);
    }
    return(
        <>
            {
                card.map((item, idx) => {
                    if(item.folder_no === parseInt(folder_no)){
                        return(
                            <>
                                {
                                    study.map((studyItem,i) => {
                                        if(studyItem.cardset_no === item.cardset_no && studyItem.category === item.category){
                                            return(
                                                <>
                                                    
                                                    <div className="fdr_set_box"
                                                         onClick={(e) => goStudy(studyItem.cardset_no,studyItem.open_scope,studyItem.category)}
                                                         style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)', cursor:'pointer'}}>
                                                        <p className="fdr_set_box_subject">
                                                            {studyItem.title}
                                                            {
                                                                studyItem.open_scope === "public" ? 
                                                                <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                studyItem.open_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                                                            }
                                                            {
                                                                studyItem.update_scope === "public" ? <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                studyItem.update_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                                                <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                                                            }
                                                        </p>
                                                        <p className="fdr_set_box_count">Set : {studyItem.cnt}</p>
                                                        <p className="fdr_set_box_id"><img src={studyItem.profile} alt=""/>
                                                        {
                                                            studyItem.provider === 'kakao' ? <img src="/profile/kakao.png" alt="" style={{width:'20px', height:'20px'}}/> :
                                                            studyItem.provider === 'google' ? <img src="/profile/google.png" alt="" style={{width:'20px', height:'20px'}}/> : 
                                                            <img src="/profile/ware.png" alt="" style={{width:'20px', height:'20px'}}/>
                                                        }
                                                        <span>{studyItem.name}</span>
                                                        {/* 아이콘 */}
                                                        {
                                                            studyItem.category === 'board' ? <StorefrontIcon/> : ''
                                                        }
                                                        </p>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </>
                        )
                    }
                })
            }
            <Modal
                open={open4}
                onClose={Close222}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                        <div className="set_pass_box">
                        <p>세트 접근 권한</p>
                        <input type="password" name="pass" placeholder="비밀번호를 입력하세요" onChange={changePassword}/><br/>
                        <button type="button" onClick={passCheck}>전송</button>
                        </div>      
            </Modal>
        </>
    )
    
    
}
export default FolderDetail;