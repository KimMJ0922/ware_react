import React, { useState, useEffect } from 'react';
import { Grid, Hidden, Button, Radio, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { XYPlot, ArcSeries, YAxis, VerticalBarSeries, XAxis } from 'react-vis';
import './MenuDtail.css'
import axios from 'axios';

//프로필 이미지 대용
import ProfileImg from './iu03.jpg';
const DiagramList=()=>{
    const PI = Math.PI;

    //Bar 임의 데이터 
    const [barData, setBarData] = useState([]);

    const [diagram, setDiagram] = useState([]);
    const [selectCheck, setSelectCheck] = useState({});
    const [chart, setChart] = useState([]);

    //주관, 객관, 테스트 셀렉트 
    const [selectMethod, setSelectMethod] = useState('');

    //회차 셀렉트
    const [selectCount, setSelectCount] = useState('');

    //정답 오답 리스트
    const [recordList, setRecordList] = useState([]);
    useEffect(()=>{
        const getList = async() => {
            let url = "http://localhost:9000/getdiagram";
            try{
                let list = await axios.post(url,{
                    member_no : window.sessionStorage.getItem('no'),
                    cardset_no : window.sessionStorage.getItem('diagram'),
                    category : window.sessionStorage.getItem('category')
                });

                let diagram = list.data.diagram;
                let last = list.data.last;
                let chart = list.data.chart;

                let data = [];  
                diagram.map((item,idx) => {
                    let temp = {
                        no : item.no,
                        cardset_no : item.cardset_no,
                        category : item.category,
                        rightcnt : item.rightcnt,
                        wrongcnt : item.wrongcnt,
                        method : item.method,
                        recordday : item.recordday,
                        name : item.name,
                        profile : item.profile,
                        title : item.title,
                        comment : item.comment
                    }
                    data.push(temp);
                });
                setDiagram([...data]);

                data = [];
                let ch = [];
                cList.map((item,idx) => {
                    let temp = {
                        no : item.no,
                        cardset_no : item.cardset_no,
                        category : item.category,
                        rightcnt : item.rightcnt,
                        wrongcnt : item.wrongcnt,
                        method : item.method,
                        recordday : item.recordday,
                        name : item.name,
                        profile : item.profile,
                        title : item.title,
                        comment : item.comment
                    }
                    data.push(temp);
                })

                last.map((item) => {
                    let check = {
                        no : item.no,
                        cardset_no : item.cardset_no,
                        category : item.category,
                        method : item.method
                    }
                    ch.push(check);
                })
                setChart([...data]);
                setSelectCheck(...ch);
            }catch(e){
                console.log(e);
            }
        }

        getList();
    },[]);

    const methodChange = (e) => {
        setSelectMethod(e.target.value);
        setSelectCount('');
    }

    const selectCntChange = (e) => {
        setSelectCount(e.target.value);
    }

    //막대 차트 최근 4개 추출하기
    useEffect(() => {
        //막대 차트
        let data =[];
        let cnt = 1;
        chart.map((item,idx) => {
            if(selectMethod === item.method){
                let stick = {
                    x : cnt+'회',
                    y : item.rightcnt/(item.rightcnt+item.wrongcnt)*100
                }
                cnt = cnt+1;
                data.push(stick);
            }
        })
        
        setBarData([...data]);

        let xylist = [];
        //4개만 출력
        data.map((item,idx) => {
            if(data.length-idx <= 4){
                let xy = {
                    x : item.x,
                    y : item.y
                }
                xylist.push(xy);
            }
        })
        setBarData([...xylist]);
    },[selectMethod]);

    //정답 오답 리스트
    useEffect(() => {
        const getDetailList = async() => {
            let record_no = selectCount;
            
            console.log(record_no);
            let url = "http://localhost:9000/getdetailrecordlist";

            try {
                let list = await axios.post(url,{record_no});
                let dlist = list.data.dlist;

                let data = [];
                dlist.map((item, idx) => {
                    data.push({...item});
                })

                setRecordList([...data]);
            } catch (error) {
                console.log(error);
            }
        }
        getDetailList();
    },[selectCount])
    return(
        <div className='diagramList'>
            {
                diagram.map((item,i) => {
                    var cnt = 0;
                    if(item.cardset_no === selectCheck.cardset_no && item.method === selectCheck.method){
                        return (
                            <>
                                <Grid container  className='DiagramInfo'  >
                                {/* 웹용 */}
                                <Hidden only={['xs','sm']}>
                                    <Grid md={6} lg={6} className='DiagramListCardBox'>
                                        <span className='DiagramInfoCardSubject'></span>
                                        <span className='DiagramInfoCardCommit'></span>
                                    </Grid>
                                    <Grid md={6} lg={6} className='DiagramInfoCardBox'>
                                        <div className='DiagramInfoCard'>
                                            <img src={ProfileImg} className='DiagramInfoCardImg' alt=''/>
                                            <span className='DiagramInfoCardId'>ExampleID</span>
                                        </div>
                                    </Grid>
                                    <Grid md={6} lg={6} className='DiagramListChart01'>
                                        <div className='ArcSeries'>
                                            <XYPlot
                                                xDomain={[-5, 5]}
                                                yDomain={[-5, 5]}
                                                width={200}
                                                height={200}>
                                                <ArcSeries
                                                    animation
                                                    radiusDomain={[0, 4]}
                                                    radiusType={'literal'}
                                                    center={{x: -1, y: 0}}
                                                    data={[]}
                                                    color={'#f55e5e'}
                                                    colorType={'literal'}/>
                                                <ArcSeries
                                                    animation
                                                    radiusDomain={[0, 4]}
                                                    radiusType={'literal'}
                                                    center={{x: -1, y: 0}}
                                                    data={[]}
                                                    color={'#289ee2'}
                                                    colorType={'literal'}/>
                                            </XYPlot>
                                        </div>
                                        <div className='ArcSeriesPoint' >
                                            {/* 정답률 */}
                                            {}%
                                        </div>
                                    </Grid>
                                    <Grid md={6} lg={6} className='DiagramListChart02'>
                                        <div class='VerticalBarSeries'>
                                        <XYPlot
                                                xType="ordinal"
                                                width={250}
                                                height={200}
                                                >
                                                <YAxis />
                                                <XAxis />
                                                <VerticalBarSeries
                                                    animation
                                                    color="#12939A"
                                                    data={[]}
                                                />
                                        </XYPlot>    
                                        </div>
                                    </Grid>
                                    <Grid xs={12} sm={12} className='DiagramListChart03'>
                    {/* -------------------- 여기서 map돌리면됨 */}
                                    <span >전보다 6문제더 맞았어요!</span>
                                    </Grid>
                                </Hidden>

                                {/* 모바일용 */}
                                <Hidden only={['md','lg','xl']}>
                                    <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                                        <span className='DiagramInfoCardSubject'>{item.title}</span>
                                        <span className='DiagramInfoCardCommit'>{item.comment}</span>
                                    </Grid>
                                    <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                                        <div className='DiagramInfoCard'>
                                            <img src={item.profile} className='DiagramInfoCardImg' alt=''/>
                                            <span className='DiagramInfoCardId'>{item.name}</span>
                                        </div>
                                    </Grid>
                                    
                                    {/* 막대 그래프 */}
                                    <Grid xs={6} sm={6} md={6} className='DiagramListChart02'>
                                        {
                                            selectMethod === '' ? '유형을 선택해주세요' :
                                            <div className='VerticalBarSeries'>
                                                <XYPlot xType="ordinal" width={170} height={130}>
                                                <XAxis />
                                                <VerticalBarSeries color="#405de8" data={[...barData]}/>
                                                </XYPlot>    
                                            </div>
                                        }
                                    </Grid>

                                    <Grid xs={6} md={6}  className='DiagramListChart01'> 
                                        {   selectCount === '' ? '회차를 선택해주세요' :  
                                            chart.map((chart, i) => {
                                                return(
                                                    <>
                                                        {
                                                            chart.method === selectMethod && selectCount === chart.no &&
                                                            <>
                                                                {/* 원형 그래프 */}
                                                                <div className='ArcSeries'>
                                                                    <XYPlot xDomain={[-5, 5]} yDomain={[-5, 5]} width={150} height={150}>
                                                                    <ArcSeries animation radiusDomain={[0, 3]} radiusType={'literal'} center={{x: -1, y: -1}}
                                                                                data={[{
                                                                                    angle0:0,
                                                                                    angle: -(2*PI*(chart.wrongcnt/(chart.rightcnt+chart.wrongcnt))),
                                                                                    radius: 40,
                                                                                    radius0:60
                                                                                }]} color={'#f55e5e'} colorType={'literal'} />
                                                                        <ArcSeries animation radiusDomain={[0, 3]} radiusType={'literal'} center={{x: -1, y: -1}}
                                                                                data={[{
                                                                                    angle0:0,
                                                                                    angle: (2*PI*(chart.rightcnt/(chart.rightcnt+chart.wrongcnt))),
                                                                                    radius: 40,
                                                                                    radius0:60
                                                                                }]} color={'#289ee2'} colorType={'literal'}/>
                                                                        
                                                                    </XYPlot>
                                                                    문제 : {chart.rightcnt+chart.wrongcnt} 정답 : {chart.rightcnt} 오답 : {chart.wrongcnt}
                                                                </div>
                                                                {/* 정답률 텍스트 */}
                                                                <div className='ArcSeriesPoint' >
                                                                    {(chart.rightcnt/(chart.rightcnt+chart.wrongcnt)*100).toFixed(1)}%
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </Grid>

                                    <Grid xs={6} sm={6} className='DiagramListChart05'>
                                        <FormControl variant="outlined" className='testKind' >
                                            <InputLabel>유형</InputLabel>
                                            <Select label="유형" onChange={methodChange}>
                                                {
                                                    diagram.map((item)=>{
                                                        return (
                                                            <MenuItem value={item.method}>
                                                                {item.method === 'subjective' ? '주관식' : item.method === 'choice' ? '객관식' : '테스트'}
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid xs={6} sm={6} className='DiagramListChart04'>
                                        <FormControl variant="outlined" className='testCount'>
                                            <InputLabel>회차</InputLabel>
                                            <Select label="회차" onChange={selectCntChange}>
                                                {
                                                    chart.map((item,i) => {
                                                        if(selectMethod === item.method){
                                                            cnt = cnt +1
                                                            return(
                                                                <MenuItem value={item.no}>
                                                                    {(cnt)+'회('+item.recordday+')'}
                                                                </MenuItem>
                                                            )
                                                        }  
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    
                                    <Grid xs={12} sm={12} className='DiagramListChart06'>
                                        <ul className='DiagramUl'>
                                            {/* 따로 컴포넌트로 뺄려고 했지만 selectCount가 바껴도 컴포넌트를 재실행하지 않음;; */}
                                            {
                                                recordList.map((record, idx) => {
                                                    if(record.record_no === selectCount){
                                                        return (
                                                            <>
                                                                <li className='DiagramLi DiagramLiChoice'>
                                                                    <div className='DiagramLiChoiceQuest'>
                                                                        <p>유형 : {record.type}</p>
                                                                        <p>문제 : {record.question}</p>   
                                                                    </div>
                                                                    <div className='DiagramLiChoiceresult'>
                                                                            <p>작성한 답 : {record.useranswer}</p>
                                                                            <p>문제 답 : {record.answer}</p>
                                                                            <p>{record.result}</p>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </Grid>
                                </Hidden>
                            </Grid>
                            </>
                        )
                    }
                })
            }
        </div>
    )
}
export default DiagramList;