import React,{useState,useEffect} from "react";
import { Paper } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';

const FolderAddList = (props) => {
    const [card,setCard] = useState(props.card);
    const [folderNo, setFolderNo] = useState(props.no);
    const [study, setStudy] = useState(props.study);
    const [list,setList] = useState([]);
    const [chList, setChList] = useState([]);

    //폴더 리스트 중에서 해당 폴더의 리스트만 따로 나누기
    const listDiv = () => {
        let data = [];
        card.map((item) => {
            if(item.folder_no === parseInt(folderNo)){
                data.push({...item});
            }
        })

        let data2=[];
        study.map((studyItem,i) => {
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

        setChList([...data2]);
    }
    useEffect(() => {
        listDiv();
    },[])

    useEffect(() => {
        setList([...chList]);
    },[chList])

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
        <>
            {
                list.map((item)=>{
                    return (
                        <>
                            <Paper className="fdr_on_add_fdr_content_box">
                                <div className="fdr_on_add_modal_box">
                                    <input type="checkbox" name="stlist" value={item.no} checked={item.checked} onChange={checkboxClick}/><span className="fdr_add_modal_con_sub_font">{item.title}()</span>
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
        </>
    );
}

export default FolderAddList;