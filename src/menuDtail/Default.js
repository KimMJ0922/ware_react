import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Grid, Hidden } from '@material-ui/core';
import {Add } from '@material-ui/icons';
import './MenuDtail.css';
const Diagram=()=>{
    const [row, setRows ]= useState([]);
    const [start, setStart] = useState(9);
    const [listMaxLeng, setListMaxLeng] = useState(0);
    useEffect(() => {
        const getStudyList = async() => {
            let url = "http://localhost:9000/getstudylist";
            let member_no = window.sessionStorage.getItem('no');

            try {
                let list = await axios.post(url,{member_no,start});
                let slist = list.data.slist;

                let data = [];
                slist.map((item,idx) => {
                    data.push({...item});
                });

                setRows([...data]);
                setListMaxLeng(slist.length);
            } catch (error) {
                console.log(error);
            }
        }

        getStudyList();
    },[start])

    const moreList = () => {
        setStart(start+9);
        console.log(start);
    }

    return(
        <>
            <span className='defaultTitle'>최근 학습함</span>
            <Grid container>
                {
                    row.map((row,i)=>{
                        return(
                            <Grid xs={12} sm={6} md={4}>
                                    <div className='mycardList'>
                                        <div className='mycardSubject'>
                                            {row.title}
                                        </div>
                                        <div className='mycardCount'>
                                            {row.cnt}문제
                                        </div>
                                        <div className='mycardCardId'>
                                            <img src={row.profile} alt="" className='cardProfileImg'/>
                                            <span>{row.name}</span>
                                            <span>{row.studyday}</span>
                                        </div>
                                    </div>
                            </Grid>
                        )})
                }
                    <Hidden only={['lg','xl']}>
                    <Grid xs={12} sm={12} md={12} >
                        <div className='defaultPageFind'>
                            {
                                start === listMaxLeng ?  
                                <button className='defaultPageFindButton' onClick={moreList}> 
                                    <Add/>
                                </button> : ''
                            }
                        </div>
                    </Grid>
                    </Hidden>
                    <Hidden only={['xs','sm','md']}>
                    <Grid  lg={12} xl={12}>
                        <div className='defaultPageFind'>
                            <span>조금더 찾아 보러갈까요?</span>
                            {
                                start === listMaxLeng ?  
                                <button className='defaultPageFindButton' onClick={moreList}> 
                                    <Add/>
                                </button> : ''
                            }
                        </div>
                    </Grid>
                    </Hidden>
            </Grid>
        </>
    )
}
export default Diagram;