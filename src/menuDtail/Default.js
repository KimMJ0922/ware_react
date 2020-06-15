import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import './MenuDtail.css';
const Diagram=()=>{
    const [row,setRows ]= useState(
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
            <span>최근 학습함</span>
            <Grid container>
                {
                    row.map((row,i)=>{
                    return(
                        <Grid xs={12} md={4}>
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
                
            </Grid>
        </>
    )
}
export default Diagram;