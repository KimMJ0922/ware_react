import React, { useState, useEffect } from 'react';
import { Grid, Hidden, Button, Radio, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { XYPlot, ArcSeries, YAxis, VerticalBarSeries, XAxis } from 'react-vis';
import DiagramLiChoice from './DiagramLiChoice';
import './MenuDtail.css'
import axios from 'axios';

//프로필 이미지 대용
import ProfileImg from './iu03.jpg';
const DiagramList=()=>{
    const PI = Math.PI;

    //폰트 트렌지션
    const [moreBetterSize, setMoreBetterSize] = useState({
        fontSize:'1.6rem'
    });
    const [moreBetter, setMoreBetter] = useState({
        fontSize:'0rem'
    });


    const [totalCount,setTotalCount] =useState(58); //총 문제 갯수 
    const [rightCount, setRightCount] = useState(29); // 맞은갯수
    const [wrongCount, setWrongCount] = useState(totalCount-rightCount); //틀린 갯수
  
    const [rightCountScore, setRightCountScore] = useState(rightCount/totalCount); //정답률
    const [godLoopCnt, setGodLoopCnt] = useState((rightCountScore*100).toFixed(1));
    
    const [myGoodData, setMyGoodData] = useState([{
        angle0:0,
        angle: 0,
        radius: 50,
        radius0:80
    }]);
    //모바일 정답률
    const [myGoodDataM, setMyGoodDataM] = useState([{
        angle0:0,
        angle: 0,
        radius: 40,
        radius0:60
    }]);

    const [wrongCountScore, setWrongCountScore] = useState(wrongCount/totalCount);  //오답률
    const [wrongloopCnt, setWrongloopCnt] = useState((wrongCountScore*100).toFixed(1));
    const [myWrongData, setMyWrongData] = useState([{
        angle0:0,
        angle: 0,
        radius: 50,
        radius0:80
    }]);
    const [myWrongDataM, setMyWrongDataM] = useState([{
        angle0:0,
        angle: 0,
        radius: 40,
        radius0:60
    }]);
   

    //select 회차
    const [testCount, setTestCount] = useState('');

      const handleChangeTestCount = (event) => {
        setTestCount(event.target.value);
        
      };

    //select 시험유형
    const [testKind, setTestKind] = useState('');
      const handleChangeTestKind = (event) => {
        setTestKind(event.target.value);
      };
    
    //Bar 임의 데이터 
    const [barData, setBarData] = useState([
        {x: '2회', y: 46},
        {x: '3회', y: 78},
        {x: '4회', y: 51},
        {x: '5회', y: 100}
    ]);

    const [diagramList, setDiagramList] = useState([]);
    const [diagramLastList, setDiagramLastList] = useState([]);
    const [selectCheck, setSelectCheck] = useState({});
    const [chartList, setChartList] = useState([]); 

    useEffect(()=>{
        const getList = async() => {
            let url = "http://localhost:9000/getdiagramlist";
            try{
                let list = await axios.post(url,{
                    member_no : window.sessionStorage.getItem('no')
                });

                let dilist = list.data.rlist;
                let lastList = list.data.lastList;
                let cList = list.data.chartList;

                let data = [];
                dilist.map((item,idx) => {
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
                setDiagramList([...data]);

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

                lastList.map((item) => {
                    let check = {
                        cardset_no : item.cardset_no,
                        category : item.category,
                        method : item.method
                    }
                    ch.push(check);
                })
                setChartList([...data]);
                setSelectCheck([...ch]);
            }catch(e){
                console.log(e);
            }
        }

        getList();
        //폰트 트렌지션
        setTimeout(()=>{
            setMoreBetter(moreBetterSize);
        },1000);
    
    },[]);


            return(
                <div className='diagramList'>
                    번호 : {selectCheck.cardset_no}
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
                                        data={myWrongData}
                                        color={'#f55e5e'}
                                        colorType={'literal'}/>
                                    <ArcSeries
                                        animation
                                        radiusDomain={[0, 4]}
                                        radiusType={'literal'}
                                        center={{x: -1, y: 0}}
                                        data={myGoodData}
                                        color={'#289ee2'}
                                        colorType={'literal'}/>
                                </XYPlot>
                            </div>
                            <div className='ArcSeriesPoint' >
                            {(rightCountScore*100).toFixed(1)}%
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
                                        data={[...barData]}
                                    />
                            </XYPlot>    
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} className='DiagramListChart03'>
                            <p className='better' style={moreBetter}><span >전보다 6문제더 맞았어요!</span></p>
                        </Grid>
                    </Hidden>

                    {/* 모바일용 */}
                    <Hidden only={['md','lg','xl']}>
                        <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                            <span className='DiagramInfoCardSubject'></span>
                            <span className='DiagramInfoCardCommit'>부제123123123</span>
                        </Grid>
                        <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                            <div className='DiagramInfoCard'>
                                <img src={ProfileImg} className='DiagramInfoCardImg' alt=''/>
                                <span className='DiagramInfoCardId'>ExampleID</span>
                            </div>
                        </Grid>
                        <Grid xs={6} md={6}  className='DiagramListChart01'>
                            <div className='ArcSeries'>
                                <XYPlot
                                    xDomain={[-5, 5]}
                                    yDomain={[-5, 5]}
                                    width={150}
                                    height={150}>
                                    <ArcSeries
                                        animation
                                        radiusDomain={[0, 3]}
                                        radiusType={'literal'}
                                        center={{x: -1, y: -1}}
                                        data={myWrongDataM}
                                        color={'#f55e5e'}
                                        colorType={'literal'}/>
                                    <ArcSeries
                                        animation
                                        radiusDomain={[0, 3]}
                                        radiusType={'literal'}
                                        center={{x: -1, y: -1}}
                                        data={myGoodDataM}
                                        color={'#289ee2'}
                                        colorType={'literal'}/>
                                </XYPlot>
                            </div>
                            <div className='ArcSeriesPoint' >
                            {(rightCountScore*100).toFixed(1)}%
                            </div>
                        </Grid>
                        <Grid xs={6} sm={6} md={6} className='DiagramListChart02'>
                            <div className='VerticalBarSeries'>
                                <XYPlot
                                        xType="ordinal"
                                        width={170}
                                        height={130}
                                        >
                                        <XAxis />
                                        <VerticalBarSeries
                                            color="#405de8"
                                            data={[...barData]}
                                        />
                                </XYPlot>    
                            </div>
                        </Grid>
                        
                        <Grid xs={12} sm={12} className='DiagramListChart03'>
                        <p className='better' style={moreBetter}><span >전보다 6문제더 맞았어요!</span></p>
                        </Grid>
                        <Grid xs={6} sm={6} className='DiagramListChart04'>
                            <div className='testCountwidth'>
                                <FormControl variant="outlined" className='testCount'>
                                    <InputLabel>회차</InputLabel>
                                    <Select
                                        
                                        value={testCount}
                                        onChange={handleChangeTestCount}
                                        label="회차"
                                        >
                    {/* -------------------- 여기서 MenuItem으로 회차 map돌리면됨 일단 3개 만들어놨음*/}
                                        <MenuItem value={'1'} >1회차 (3.13)</MenuItem>
                                        <MenuItem value={'2'}>2회차 (4.24)</MenuItem>
                                        <MenuItem value={'3'}>3회차 (5.3)</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid xs={6} sm={6} className='DiagramListChart05'>
                            <div className='testCountwidth'>
                                <FormControl variant="outlined" className='testKind' >
                                        <InputLabel >유형</InputLabel>
                                        <Select
                                            value={testKind}
                                            onChange={handleChangeTestKind}
                                            label="유형"
                                            >
                                            <MenuItem value={'subjective'}>주관식</MenuItem>
                                            <MenuItem value={'choice'}>객관식</MenuItem>
                                            <MenuItem value={'test'}>테스트</MenuItem>
                                        </Select>
                                    </FormControl>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} className='DiagramListChart06'>
                            <ul className='DiagramUl'>
                                {
                                    <DiagramLiChoice/>
                                }
                            </ul>
                        </Grid>
                    </Hidden>
                </Grid>
                </div>
            )
}
export default DiagramList;