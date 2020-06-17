import React, { useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import {Add } from '@material-ui/icons';
import './MenuDtail.css';
const Diagram=()=>{
    const [row, setRows ]= useState(
        [
            //db가 없어서 임의로 만듬
            {
                subject:'example01',
                count:83,
                profileImg:'강아지사진',
                cardId:'KingSE'
            },
            {
                subject:'example02',
                count:57,
                profileImg:'사진2',
                cardId:'susansok'
            },
            {
                subject:'example03',
                count:98,
                profileImg:'강아지사진',
                cardId:'KingSE'
            },
            {
                subject:'example04',
                count:41,
                profileImg:'강아지사진',
                cardId:'KingSE'
            },
            {
                subject:'example05',
                count:28,
                profileImg:'강아지사진',
                cardId:'KingSE'
            },
            {
                subject:'example06',
                count:32,
                profileImg:'강아지사진',
                cardId:'KingSE'
            }
        ]
    );
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
                                        {row.subject}
                                    </div>
                                    <div className='mycardCount'>
                                        {row.count}문제
                                    </div>
                                    <div className='mycardCardId'>
                                        {/* <img src="'..img/'{row.prifileImg}"/>  이미지 변수화 방법 알아야 함*/}
                                        {/* 이미지 대용 */}
                                        <div className='cardProfileImg'>&nbsp;</div>
                                        <span>{row.cardId}</span>
                                    </div>
                                </div>
                        </Grid>
                    )})
                }
                    <Hidden only={['lg','xl']}>
                    <Grid xs={12} sm={12} md={12} >
                        <div className='defaultPageFind'>
                            <button className='defaultPageFindButton'> 
                                <Add/>
                            </button> 
                        </div>
                    </Grid>
                    </Hidden>
                    <Hidden only={['xs','sm','md']}>
                    <Grid  lg={12} xl={12}>
                        <div className='defaultPageFind'>
                            <span>조금더 찾아 보러갈까요?</span>
                            <button className='defaultPageFindButton'>더 찾아보기</button> 
                        </div>
                    </Grid>
                    </Hidden>
            </Grid>
        </>
    )
}
export default Diagram;