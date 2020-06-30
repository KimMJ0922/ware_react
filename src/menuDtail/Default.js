import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router';
import { Grid, Hidden } from '@material-ui/core';
import {Add } from '@material-ui/icons';
import './MenuDtail.css';
const Diagram=()=>{
    let history = useHistory();
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

    const goStudy = (cardset_no, open_scope, category) => {
        console.log(cardset_no, open_scope, category);
        if(category === 'cardset'){
            if(open_scope === 'member'){
                let pass = window.prompt("비밀번호를 입력하세요");
                passCheck(cardset_no,pass);
            }else{
                window.sessionStorage.setItem('cardset_no',cardset_no);
                window.sessionStorage.setItem('study','cardset');
                setStudy();
            }
        }else{
            window.sessionStorage.setItem('cardset_no',cardset_no);
            window.sessionStorage.setItem('study','board');
            setStudy();
        }

        history.push('/study');
    }

    const passCheck = (no,pass) => {
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
    return(
        <>
            <span className='defaultTitle'>최근 학습함</span>
            <Grid container>
                {
                    row.map((row,i)=>{
                        return(
                            <Grid xs={12} sm={6} md={4} onClick={(e) => goStudy(row.cardset_no,row.open_scope,row.category)} name={row.cardset_no} style={{cursor:'pointer'}}>
                                    <div className='mycardList'>
                                        <div className='mycardSubject'>
                                            {row.title}
                                        </div>
                                        <div className='mycardCount'>
                                            {row.cnt}문제
                                        </div>
                                        <div className='mycardCardId'>
                                            <p>
                                                <img src={row.profile} alt="" className='cardProfileImg'/>
                                                <span className='mycardCardConnect'>
                                                    {
                                                        row.provider === 'kakao' ? <img src="/profile/kakao.png" alt="" style={{width:'30px', height:'30px'}}/> :
                                                        row.provider === 'google' ? <img src="/profile/google.png" alt="" style={{width:'30px', height:'30px'}}/> : 
                                                        <img src="/profile/ware.png" alt="" style={{width:'30px', height:'30px'}}/>
                                                    }
                                                </span>
                                                <span className='mycardCardName'>{row.name}</span>
                                                <span className='mycardCardWriteDay'>{row.studyday}</span>
                                            </p>
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
                          
                            {
                                start === listMaxLeng ?  <>
                                <span>조금더 찾아 보러갈까요?</span>
                                <button className='defaultPageFindButton' onClick={moreList}> 
                                    <Add/>
                                </button> </>: ''

                            }
                        </div>
                    </Grid>
                    </Hidden>
            </Grid>
        </>
    )
}
export default Diagram;