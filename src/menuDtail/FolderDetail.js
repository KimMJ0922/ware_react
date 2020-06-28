import React,{useState,useEffect} from 'react';
import axios from 'axios';

const FolderDetail=({props})=>{
    return(
        <>
            <div className="fdr_set_box" style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                <p className="fdr_set_box_subject">테스트</p>
                <p className="fdr_set_box_count">(count) 개</p>
                <p className="fdr_set_box_id">userid</p>
            </div>
        </>
    )
}
export default FolderDetail;