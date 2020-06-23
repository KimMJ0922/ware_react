import React, { useState, useEffect } from 'react';
import { Grid, Hidden, Button, Radio } from '@material-ui/core';
import { ExpandMore,ExpandLess,ChevronRight } from '@material-ui/icons';
import {Link} from 'react-router-dom';

import { XYPlot, ArcSeries, YAxis, VerticalBarSeries, XAxis } from 'react-vis';
import './MenuDtail.css'

//프로필 이미지 대용
import ProfileImg from './iu03.jpg';

const DiagramChart=()=>{

    const PI = Math.PI;
    // const [search, setSearch] = useState('');
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
    
    //Bar 임의 데이터 
    const [barData, setBarData] = useState([
        {x: '2회', y: 46},
        {x: '3회', y: 78},
        {x: '4회', y: 51},
        {x: '5회', y: 100}
    ]);
    
    //radio 
    const [selectedValue, setSelectedValue] = useState("테스트");

    const selectChange = event => {
        setSelectedValue(event.target.value);
    };

    useEffect(()=>{
        //웹 오답률 출력
        setTimeout(()=>{
            for(var i=0; i<wrongloopCnt;i++){
                // eslint-disable-next-line no-loop-func
                ((x) => {
                    setTimeout(() => {
                        let data ={
                            angle0:0,
                            angle: -(2*PI*(i/100)),
                            radius: 50, 
                            radius0:80
                        }
                        setMyWrongData([{...data}]);
                        console.log('ㅎ'+x);
                        
                    },x*1000)
                })(i);
            }
        },900);  
        //모바일 오답률 출력
        setTimeout(()=>{
            for(var i=0; i<wrongloopCnt;i++){
                // eslint-disable-next-line no-loop-func
                ((x) => {
                    setTimeout(() => {
                        let dataM ={
                            angle0:0,
                            angle: -(2*PI*(i/100)),
                            radius: 40, 
                            radius0:60
                        }
                        setMyWrongDataM([{...dataM}]);
                    },x*1000)
                })(i);
            }
        },1500);  
        //웹 정답률 출력
        setTimeout(()=>{
            for(var i=0; i<godLoopCnt;i++){
                // eslint-disable-next-line no-loop-func
                ((x) => {
                    setTimeout(() => {
                        let data ={
                            angle0:0,
                            angle: 2*PI*(i/100),
                            radius: 50, 
                            radius0:80
                        }
                        setMyGoodData([{...data}]);
                        console.log('ㅗ'+x);
                      
                    },x*1000)
                })(i);
            }
        },500);   
        //모바일 정답률 출력
        setTimeout(()=>{
            for(var i=0; i<godLoopCnt;i++){
                // eslint-disable-next-line no-loop-func
                ((x) => {
                    setTimeout(() => {
                        let dataM ={
                            angle0:0,
                            angle: 2*PI*(i/100),
                            radius: 40, 
                            radius0:60
                        }
                        setMyGoodDataM([{...dataM}]);
                    },x*1000)
                })(i);
            }
        },1100);  
       
    },[]);



    return(
        
        <Grid container  className='DiagramInfo' >
            
            {/* 웹용 */}
            <Hidden only={['xs','sm']}>
            <Grid md={3} className='DiagramInfoCardBox'>
                    <span className='DiagramInfoCardSubject'>제목1</span>
                    <span className='DiagramInfoCardCommit'>부제123123123</span>
                    <div className='DiagramInfoCard'>
                        <img src={ProfileImg} className='DiagramInfoCardImg' alt=''/>
                        <span className='DiagramInfoCardId'>ExampleID</span>
                    </div>
                </Grid>
                <Grid md={3} lg={3} className='DiagramInfoChart01'>
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
                <Grid md={3} lg={3} className='DiagramInfoChart02'>
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
                <Grid md={2} lg={2} className='DiagramListChart04'>
                    <div className='diagramSearchForm'>
                        <ul>
                            <li>
                                <Radio
                                checked={selectedValue === "객관식"}
                                onChange={selectChange}
                                value="객관식"
                                name="radio-button-demo"
                                className="diagramSearchRadio"
                                />객관식
                            </li>
                            <li>
                            <Radio
                            checked={selectedValue === "주관식"}
                            onChange={selectChange}
                            value="주관식"
                             />주관식
                            </li>
                            <li>
                            <Radio
                            checked={selectedValue === "테스트"}
                            onChange={selectChange}
                            value="테스트"
                              />테스트
                            </li>
                        </ul>
                    </div>
                </Grid>
                <Grid md={1} lg={1} className='DiagramListChart03'>
                    <Link exact to='/home/diagramlist'>
                        <Button id='DiagramDetail'>
                            <ChevronRight style={{ fontSize: 45 }}/>
                        </Button>
                    </Link>
                </Grid>
            </Hidden>


            {/* 모바일용 */}
            <Hidden only={['md','lg','xl']}>
                <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                    <span className='DiagramInfoCardSubject'>제목1</span>
                    <span className='DiagramInfoCardCommit'>부제123123123</span>
                </Grid>
                <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                    <div className='DiagramInfoCard'>
                        <img src={ProfileImg} className='DiagramInfoCardImg' alt=''/>
                        <span className='DiagramInfoCardId'>ExampleID</span>
                    </div>
                </Grid>
                <Grid xs={6} md={6}  className='DiagramInfoChart01'>
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
                <Grid xs={6} sm={6} md={6} className='DiagramInfoChart02'>
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
                    <div className='diagramSearchForm'>
                    <Radio
                        checked={selectedValue === "객관식"}
                        onChange={selectChange}
                        value="객관식"
                        name="radio-button-demo"
                        className="diagramSearchRadio"
                    />객관식
                    
                    <Radio
                        checked={selectedValue === "주관식"}
                        onChange={selectChange}
                        value="주관식"
                    />주관식
                    <Radio
                        checked={selectedValue === "테스트"}
                        onChange={selectChange}
                        value="테스트"
                    />테스트
                    </div>
                </Grid>
                <Grid xs={12} sm={12} className='DiagramListChart04'>
                    <div className='moreView'>
                        <Link exact to='/home/diagramlist'>
                            <Button id='DiagramDetail'>
                                <ExpandMore style={{ fontSize: 20 }} color='#fff'/>
                            </Button>
                        </Link>
                     </div>
                </Grid>
            </Hidden>
            
        </Grid>
    )
}
export default DiagramChart;