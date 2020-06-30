import React,{useState,useEffect} from 'react';
import TestImg from './iu03.jpg';
import StorefrontIcon from '@material-ui/icons/Storefront';
import axios from 'axios';

const FolderDetail=(props)=>{
    let card = props.card;
    let folder_no = props.no;
    let study = props.study;
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
                                            console.log(studyItem);
                                            return(
                                                <>
                                                    <div className="fdr_set_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                                                        <p className="fdr_set_box_subject">{studyItem.title}</p>
                                                        <p className="fdr_set_box_count">Set : {studyItem.cnt}</p>
                                                        <p className="fdr_set_box_id"><img src={TestImg} alt="경로 오류"/><span>아이디 들어올 자리</span>
                                                        {/* 아이콘 */}
                                                        <StorefrontIcon/>
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
        </>
    )
    
    
}
export default FolderDetail;