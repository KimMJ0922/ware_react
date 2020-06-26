import React, { useState, useEffect } from 'react';
import { Grid, Hidden, Button, Radio } from '@material-ui/core';
import { ExpandMore,ExpandLess,ChevronRight } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router';
import { XYPlot, ArcSeries, YAxis, VerticalBarSeries, XAxis } from 'react-vis';
import './MenuDtail.css'

const DiagramChart=(props)=>{
    const PI = Math.PI;
    var history = useHistory();
    // const [search, setSearch] = useState('');
    const [totalCount,setTotalCount] =useState(props.item.rightcnt+props.item.wrongcnt); //총 문제 갯수 
    const [rightCount, setRightCount] = useState(props.item.rightcnt); // 맞은갯수
    const [wrongCount, setWrongCount] = useState(props.item.wrongcnt); //틀린 갯수
  
    const [rightCountScore, setRightCountScore] = useState(rightCount/totalCount); //정답률
    const [godLoopCnt, setGodLoopCnt] = useState((rightCountScore*100).toFixed(1));
    
    const [myGoodData, setMyGoodData] = useState([{
        angle0:0,
        angle: (2*PI*(godLoopCnt/100)),
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
        angle: -(2*PI*(wrongloopCnt/100)),
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
    ]);
    
    //radio 
    const [selectedValue, setSelectedValue] = useState(props.item.method);

    //props에서 받은 list
    const [diagramList, setDiagramList] = useState([...props.diaList]);
    const selectChange = event => {
        let name = parseInt(event.target.name);
        setSelectedValue(event.target.value);
        let radioCheck = props.radioCheck;
        radioCheck.map((item) => {
            if(item.cardset_no === name){
                item["method"] = event.target.value;
            }
        });
        props.setRadioCheck([...radioCheck]); 
    };

    useEffect(()=>{
        let chartList = props.chartList;
        let data = [];
        //해당 카드세트에 맞는 차트 거르기
        chartList.map((item,idx) => {
            if(item.method === props.item.method && item.cardset_no === props.item.cardset_no){
                data.push(item);
            }
        })

        //거른걸로 4개 출력
        let leng = data.length-1;
        let xydata = [];
        data.map((item,idx) => {
            if(leng-idx<=3){
                let xy ={
                    x : (idx+1)+'회',
                    y : item.rightcnt/(item.rightcnt+item.wrongcnt)*100
                }

                xydata.push(xy);
            }
        })

        setBarData([...xydata]);
    },[]);
    
    const goDiagramList = (e) => {
        e.preventDefault();
        window.sessionStorage.setItem('diagram',props.item.cardset_no);
        history.push('/home/diagramlist');
    }

    return(
        <Grid container  className='DiagramInfo' >
            
            {/* 웹용 */}
            <Hidden only={['xs','sm']}>
            <Grid md={3} className='DiagramInfoCardBox'>
                    <span className='DiagramInfoCardSubject'>{props.item.title}</span>
                    <span className='DiagramInfoCardCommit'>{props.item.comment}</span>
                    <div className='DiagramInfoCard'>
                        <img src={props.item.profile} className='DiagramInfoCardImg' alt=''/>
                        <span className='DiagramInfoCardId'>{props.item.name}</span>
                    </div>
                </Grid>
                <Grid md={3} lg={3} className='DiagramInfoChart01'>
                <div className='ArcSeriesInfo'>
                        마지막 시험
                    </div>
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
                     {(rightCountScore*100).toFixed(0)}%
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
                                barWidth={0.4}
                                color="#12939A"
                                data={[...barData]}
                            />
                    </XYPlot>    
                    </div>
                </Grid>
                <Grid md={2} lg={2} className='DiagramListChart04'>
                    <div className='diagramSearchForm'>
                        <ul>
                            {
                                //기록 되어있는 것만 출력
                                diagramList.map((item) => {
                                    if(item.cardset_no === props.item.cardset_no){
                                        return (
                                            <>
                                                <li>
                                                    <Radio
                                                        checked={selectedValue === item.method}
                                                        onChange={selectChange}
                                                        value={item.method}
                                                        //name="radio-button-demo"
                                                        name = {props.item.cardset_no}
                                                        className="diagramSearchRadio"
                                                    />{item.method === "subjective" ? "주관식" : 
                                                       item.method === "choice" ? "객관식" : "테스트"}
                                                </li>
                                            </>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </Grid>
                <Grid md={1} lg={1} className='DiagramListChart03'>
                    <Link onClick={goDiagramList}>
                        <Button id='DiagramDetail'>
                            <ChevronRight style={{ fontSize: 45 }}/>
                        </Button>
                    </Link>
                </Grid>
            </Hidden>


            {/* 모바일용 */}
            <Hidden only={['md','lg','xl']}>
                <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                    <span className='DiagramInfoCardSubject'>{props.item.title}</span>
                    <span className='DiagramInfoCardCommit'>{props.item.comment}</span>
                </Grid>
                <Grid xs={6} md={6} className='DiagramInfoCardBox'>
                    <div className='DiagramInfoCard'>
                        <img src={props.item.profile} className='DiagramInfoCardImg' alt=''/>
                        <span className='DiagramInfoCardId'>{props.item.name}</span>
                    </div>
                </Grid>
                <Grid xs={6} md={6}  className='DiagramInfoChart01'>
                    <div className='ArcSeriesInfo'>
                        마지막 시험
                    </div>
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
                    {
                    (rightCountScore*100).toFixed(0)
                    }%
                    </div>
                    
                </Grid>
                <Grid xs={6} sm={6} md={6} className='DiagramInfoChart02'>
                    <div className='VerticalBarSeries'>
                        
                        <XYPlot
                                xType="ordinal"
                                width={170}
                                height={170}
                                >
                                <XAxis />
                                
                                <VerticalBarSeries
                                    color="#405de8"
                                    data={[...barData]}
                                    barWidth={0.4}
                                />
                        </XYPlot>    
                    </div>
                </Grid>
               <Grid xs={12} sm={12} className='DiagramListChart03'>
                    <div className='diagramSearchForm'>
                        {
                            //기록 되어있는 것만 출력
                            diagramList.map((item) => {
                                if(item.cardset_no === props.item.cardset_no){
                                    return (
                                        <>
                                            <Radio
                                                checked={selectedValue === item.method}
                                                onChange={selectChange}
                                                value={item.method}
                                                //name="radio-button-demo"
                                                name = {props.item.cardset_no}
                                                className="diagramSearchRadio"
                                            />{item.method === "subjective" ? "주관식" : 
                                                item.method === "choice" ? "객관식" : "테스트"}
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                </Grid>
                <Grid xs={12} sm={12} className='DiagramListChart04'>
                    <div className='moreView'>
                        {/* exact to='/home/diagramlist' ch={'dddddd'} */}
                        <Link onClick={goDiagramList}>
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