import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import './MenuDtail.css';
import { Paper,Radio } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FolderDetail from './FolderDetail';

// 아이콘
import FolderIcon from '@material-ui/icons/FolderOpenSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';
import StorefrontIcon from '@material-ui/icons/Storefront';


const Folder=()=>{
    const [open, setOpen] = useState(false);
    const [modifyOpen, setModifyOpen] = useState(false);
    const [maxLength, setMaxLength] = useState(0);
    const [menuClickNo, setMenuClickNo] = useState(0);
    const [folderSetting, setFolderSetting] = useState({
        title : '',
        comment : ''
    })

    //폴더 목록
    const [folder, setFolder] = useState([]);

    //폴더 안에 카드 목록
    const [cardList, setCardList] = useState([]);

    //정렬
    const [sort, setSort] = useState('최신순');

    //목록 추가 모달
    const [addFolderList, setAddFolderList] = useState(false);

    //학습한 목록
    const [studyList, setStudyList] = useState([]);

    //추가하는 폴더 번호
    const [folderNo, setFolderNo] = useState(0);

    //추가할 목록
    const [chList, setChList] = useState([]);

    //리스트
    const [list, setList] = useState([]);
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    //수정용 모달 
    //   메뉴
    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuClick = (no) => (event) => {
        setMenuClickNo(no);
        setAnchorEl(event.currentTarget);
    };

    const menuClose = () => {
        setAnchorEl(null);
    };
   
    //폴더 만들기에서 제목, 설명 바꿀 때
    const changeFolderSetting = (e) => {
        setFolderSetting({
            ...folderSetting,
            [e.target.name] : e.target.value
        })
    }
    //폴더 만들기
    const createFolder = () => {
        if(folderSetting.title.length === 0){
            alert('제목을 입력해주세요');
            return false;
        }

        if(folderSetting.comment.length === 0){
            alert('설명을 입력해주세요');
            return false;
        }

        let url = "http://localhost:9000/createfolder";
        axios.post(url,{
            title : folderSetting.title,
            comment : folderSetting.comment,
            member_no : window.sessionStorage.getItem('no')
        }).then((res) => {
            setFolderSetting({
                title : '',
                comment : ''
            })
            handleClose();
            getFolder();
        }).catch((err) => {

        })
    }

    //폴더 가져오기
    const getFolder = () => {
        let url = "http://localhost:9000/getfolder";
        let data = [];
        axios.post(url,{
            member_no : window.sessionStorage.getItem('no'),
            sort
        }).then((res) => {
            let flist = res.data.flist;

            flist.map((item,idx) => {
                data.push({...item,visible : false});
            })
           
            setFolder([...data]);
        }).catch((err) => {

        })

        setFolder([...folder]);
    }

    useEffect(() => {
        getFolder();
        getFolderStudyList();
        getFolderCardList();
    },[])

    //폴더 수정
    const folderModify = () => {
        setModifyOpen(true);
        folder.map((item) => {
            if(item.no === menuClickNo){
                setFolderSetting({
                    title : item.title,
                    comment : item.comment
                })
            }
        })
        menuClose();
    }

    const folderModifyClose = () => {
        setFolderSetting({
            title : '',
            comment : ''
        })
        setModifyOpen(false);
    }

    //폴더 수정
    const modifyFolder = () => {
        let url = "http://localhost:9000/modifyfolder";
        axios.post(url,{
            no : menuClickNo,
            title : folderSetting.title,
            comment : folderSetting.comment
        }).then((res) => {
            folderModifyClose();
            getFolder();
        }).catch((err) => {

        })
    }

    //라디오 버튼 클릭시
    const sortRadioClick = (e) => {
        setSort(e.target.value);
        
    }

    //한박자 늦게 먹어서 useEffect 사용
    useEffect(() => {
        getFolder();
    },[sort])

    //폴더 삭제
    const deleteFolder = () => {
        menuClose();
        let url = "http://localhost:9000/deletefolder";
        axios.post(url,{
            no : menuClickNo
        }).then((res) => {
            getFolder();
        }).catch((err) => {

        })
    }

    const changeVisible = (no) => {
        folder.map((item,idx)=> {
            if(item.no === parseInt(no)){
                item["visible"] = !item.visible;
            }
        })

        setFolder([...folder]);
    }

    //학습 목록 가져오기
    const getFolderStudyList = () => {
        let url = "http://localhost:9000/getstudylist";
        let data = [];
        axios.post(url,{
            member_no : window.sessionStorage.getItem('no'),
            start : 999999999
        }).then((res) => {
            let list = res.data.slist
            list.map((item,idx)=> {
                data.push({...item});
            })

            setStudyList([...data]);
        }).catch((err) => {

        })
    }

    const addListModal = (no) => {
        setFolderNo(no);
        setAddFolderList(true);
        listDiv();
    }

    const addListModalClose = () => {
        setAddFolderList(false);
    }

    //추가하기 버튼
    const addStudyFolderList = () => {
        let checkList = document.getElementsByName('stlist');
        let no = [];
        //체크한 항목 가져오기
        for(var i=0; i<checkList.length; i++){
            if(checkList[i].checked){
                no.push(checkList[i].value);
            }
        }

        //선택한 것의 정보 가져오기
        let data = [];
        studyList.map((item,idx)=>{
            if(no.indexOf(item.no+'') >= 0){
                data.push({...item});
            }
        });
        
        insertStudyList(data);
        
    }

    const insertStudyList = (insertList) => {
        let url = "http://localhost:9000/insertstudylist";
        axios.post(url,{
            folder_no : folderNo,
            insertList
        }).then((res) => {
            addListModalClose();
            getFolder();
            getFolderCardList();
        }).catch((err) => {

        })
    }

    const getFolderCardList = () => {
        let url = "http://localhost:9000/getfoldercardlist";
        let data = [];
        axios.post(url,{
            member_no : window.sessionStorage.getItem('no')
        }).then((res) => {
            let list = res.data.fllist
            list.map((item,idx)=> {
                data.push({...item});
            })
            setCardList([...data]);
        }).catch((err) => {

        })

        setCardList([...cardList]);
    }


    //폴더 리스트 중에서 해당 폴더의 리스트만 따로 나누기
    const listDiv = () => {
        let no = parseInt(folderNo);
        let data = [];
        cardList.map((item) => {
            if(item.folder_no === no){
                data.push({...item});
            }
        })

        let data2=[];
        studyList.map((studyItem,i) => {
            let re = data.map((listItem,idx) => {
                if(studyItem.category === listItem.category && studyItem.cardset_no === listItem.cardset_no){
                    return false;
                }else{
                    return listItem;
                }
            })
            if(re.indexOf(false) === -1){
                data2.push({...studyItem,checked : ''});
            }else{
                data2.push({...studyItem,checked : 'true'});
            }
        })

        setList([...data2]);
    }
    useEffect(() => {
        listDiv();
    },[addFolderList]);
    const checkboxClick = (e) => {
        let no = e.target.value;
        list.map((item) => {
            if(item.no === parseInt(no)){
                if(item["checked"] === ''){
                    item["checked"] = 'true';
                }else{
                    item["checked"] = '';
                }
            }
        })

        setList([...list]);
    }
    
    return(
        <div className="fdr_body">
             <Grid container> 
                <Grid item xs={12} md={12}>
                <Grid container>    
                    <Grid item xs={4} md={2} >                   
                        <img src={window.sessionStorage.getItem('profile')} alt="" className="proimg"/>                    
                    </Grid>
                    <Grid item xs={8} md={10}>
                      
                        <p className="id_box">
                            <span className="id" style={{display:'flex'}}>{window.sessionStorage.getItem('name')}</span>
                            <p className="pro_fdr_count"><FolderIcon/><span className="fdr_length_font"> {folder.length} 개 </span></p>
                        </p>
                       
                        </Grid>
                </Grid>
                    {/* 폴더가 없을 때 */}
                    {
                        folder.length === 0 &&
                        <>    
                            <Paper>
                                <div className="fdr_no_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                                    <span className="fdr_no_font1">회원님은 아직 폴더를 생성하시지 않았습니다.</span><br/>
                                    <span className="fdr_no_font2">폴더를 만들어 세트를 정리하세요.</span><br/>
                                    <button type="button" onClick={handleOpen} className="fdr_no_btn">폴더 만들기</button>
                                </div>
                            </Paper>
                            
                        </>
                    }
                </Grid>
                    {/* 폴더가 있을때 */}
                    {
                        folder.length !== 0 && 
                        <>  
                        <div className="fdr_sort_box">
                            <Radio name="sort" value="최신순" onClick={sortRadioClick} 
                                checked={sort === '최신순' ? 'checked' : ''}/>최신순
                            <Radio name="sort" value="오래된순" onClick={sortRadioClick} 
                                checked={sort === '오래된순' ? 'checked' : ''}/>오래된순
                            <Radio name="sort" value="폴더명 오름차순" onClick={sortRadioClick}
                                checked={sort === '폴더명 오름차순' ? 'checked' : ''}/>폴더명 오름차순
                            <Radio name="sort" value="폴더명 내림차순" onClick={sortRadioClick}
                                checked={sort === '폴더명 내림차순' ? 'checked' : ''}/>폴더명 내림차순
                                <button type="button" onClick={handleOpen} className="fdr_add_btn">폴더 만들기</button>
                        </div>
                            {
                                folder.map((item,idx) => {
                                    return (
                                        <>
                                            <Grid container>
                                                <Grid item xs={12} md={12}>
                                                    {/*  */}
                                                    <Paper className="fdr_subject_box">
                                                        <FolderIcon  onClick={(e) => changeVisible(item.no)}/> 
                                                        <span className="fdr_on_font1"  onClick={(e) => changeVisible(item.no)}>{item.title} ({item.cnt})</span> 
                                                        <AddIcon  onClick={(e) => addListModal(item.no)} name="addBtn"/>  
                                                        <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" onClick={menuClick(item.no)}/>
                                                    </Paper> 
                                                </Grid>                                    
                                            </Grid>
                                            {
                                                item.visible === true &&
                                                <>
                                                    <Grid container>
                                                        <Grid item xs={12} md={12}>
                                                        설명 : {item.comment}
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <FolderDetail no={item.no} study={studyList} card={cardList}/>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            }
                                        </>
                                    )
                                })
                            }
                        </>
                    }
            </Grid>

            {/* 새 폴더 작성용 모달 */}
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div className="fdr_on_modal">
                    <p className="fdr_on_modal_top">새로운 폴더 만들기</p>
                    <div style={{textAlign:'center',marginTop:'30px'}}>
                        <input type="text" className="fdr_on_modal_input" name="title" value={folderSetting.title} placeholder="폴더명을 입력하세요" onChange={changeFolderSetting}/>
                        <input type="text" className="fdr_on_modal_input" name="comment" value={folderSetting.comment} placeholder="설명을 입력하세요" onChange={changeFolderSetting}/>
                        <button type="button" className="fdr_on_submit" onClick={createFolder}>폴더 만들기</button>
                    </div> 
                </div> 
            </Modal>

            {/* 수정용 모달 */}
            <Modal open={modifyOpen} onClose={folderModifyClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div className="fdr_on_modal">
                    <p className="fdr_on_modal_top">폴더 수정</p>
                    <div style={{textAlign:'center',marginTop:'30px'}}>
                        <input type="text" className="fdr_on_modal_input" name="title" value={folderSetting.title} placeholder="폴더명을 입력하세요" onChange={changeFolderSetting}/>
                        <input type="text" className="fdr_on_modal_input" name="comment" value={folderSetting.comment} placeholder="설명을 입력하세요" onChange={changeFolderSetting}/>
                        <button type="button" className="fdr_on_submit" onClick={modifyFolder}>폴더 수정</button>
                    </div> 
                </div> 
            </Modal>
            
            {/* 모달로 학습한 목록  */}
            <Modal open={addFolderList} onClose={addListModalClose} aria-labelledby="simple-modal-title"                   aria-describedby="simple-modal-description">
                <div className="fdr_on_modal">
                    <p className="fdr_on_modal_top">폴더에 목록 추가하기</p>
                    <div className="fdr_on_add_fdr_content">
                    {/* <FolderAddList study={studyList} card={cardList} no={folderNo}/> */}
                    {
                        list.map((item)=>{
                            return (
                                <>
                                    <Paper className="fdr_on_add_fdr_content_box">
                                        <div className="fdr_on_add_modal_box">
                                            <input type="checkbox" name="stlist" value={item.no} checked={item.checked} onChange={checkboxClick}/>
                                            <span className="fdr_add_modal_con_sub_font">
                                                {item.title}(카드 : {item.cnt})
                                                {
                                                    item.open_scope === "public" ? 
                                                    <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                    item.open_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                    <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                                                }
                                                {
                                                    item.update_scope === "public" ? <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                    item.update_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                                    <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                                                }
                                            </span>
                                            <img src={item.profile} alt=""/><span className="fdr_add_modal_con_name_font">{item.name}</span>
                                            {/* 아이콘 */}
                                            {
                                                item.category === 'board' ? <StorefrontIcon/> : ''
                                            }
                                        </div>
                                    </Paper>
                                </>
                            )
                        })  
                    }
                    <div className="fdr_on_add_submit_btn_box">
                        <button type="button" onClick={addStudyFolderList}>추가하기</button>
                    </div>
                    </div> 
                </div> 
            </Modal>

             <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={menuClose} keepMounted
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                <MenuItem onClick={folderModify}><CreateIcon/>수정</MenuItem>
                <MenuItem onClick={deleteFolder}><DeleteIcon/>삭제</MenuItem>
            </Menu>
        </div>
    )
}
export default Folder;