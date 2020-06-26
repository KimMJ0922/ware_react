import React, { useState, useEffect } from 'react';
import { Grid, Hidden, Button, Radio, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { XYPlot, ArcSeries, YAxis, VerticalBarSeries, XAxis } from 'react-vis';
import './MenuDtail.css'
import axios from 'axios';

//프로필 이미지 대용
import ProfileImg from './iu03.jpg';
const DiagramList=()=>{

    var items=null;
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
    if(testKind==='subjective'){
        items =
        <ul className='DiagramUl'>
{/* -------------------- 여기서li를 문제 map돌리면됨*/}
            <li className='DiagramLi DiagramLiSubjective'>
                <p>사람이름이 아닌것은?</p>
                <p>
                    <span>나의 답 : </span>
                    <span className='DiagramLiSubjectiveMyResult'>곽철용</span>
                </p>
                <p>
                <span>정답 : </span>
                <span className='DiagramLiSubjectiveResult'>엄준식</span>
                </p>
            </li> 
            <li className='DiagramLi DiagramLiSubjective'>
                <p>1962년 애덤스미스가 설명한 오늘날 경제학의 중심이된 이론은?</p>
                <p>
                    <span>나의 답 : </span>
                    <span className='DiagramLiSubjectiveMyResult'>잘보이는 손</span>
                </p>
                <p>
                <span>정답 : </span>
                <span className='DiagramLiSubjectiveResult'>보이지않는 손</span>
                </p>
            </li>
        </ul>
    }else if(testKind==='choice'){
        items =
        <ul className='DiagramUl'>
{/* -------------------- 여기서list로 문제 map돌리면됨 일단 3개 만들어놨음*/}
            <li className='DiagramLi DiagramLiChoice'>
                
                <div className='DiagramLiChoiceQuest'>
                    <p>대한민국의 수도는?</p>    
                    <p>1. 평양</p>
                    <p>2. 가나</p>
                    <p>3. 우리집화장실</p>
                    <p>4. 서울</p>
                </div>
                <div className='DiagramLiChoiceresult'>
                    <p>
                        <span>내가 고른답 : 2 </span>
                        <span>문제 정답 : 4 </span>
                    </p>
                </div>
                
            </li>
            <li className='DiagramLi DiagramLiChoice'>
                <div className='DiagramLiChoiceQuest'>
                    <p>대한민국의 수도는?</p>    
                    <p>1. 평양</p>
                    <p>2. 가나</p>
                    <p>3. 우리집화장실</p>
                    <p>4. 서울</p>
                </div>
                <div className='DiagramLiChoiceresult'>
                    <p>
                        <span>내가 고른답 : 2 </span>
                        <span>문제 정답 : 4 </span>
                    </p>
                </div>
            </li>
            <li className='DiagramLi DiagramLiChoice'>
                <div className='DiagramLiChoiceQuest'>
                    <p>대한민국의 수도는?</p>    
                    <p>1. 평양</p>
                    <p>2. 가나</p>
                    <p>3. 우리집화장실</p>
                    <p>4. 서울</p>
                </div>
                <div className='DiagramLiChoiceresult'>
                    <p>
                        <span>나의 답 : 2 </span>
                        <span> 정답 : 4 </span>
                    </p>
                </div>
                
            </li>
        </ul>
    }else if(testKind==='test'){
            items =
            <ul className='DiagramUl'>
{/* 여기 문제 섞어서 출력해야 하는데 객관식 주관식 따로따로 map을 써서출력을 어떻게 해야할지 모르겠음  */}
                <li className='DiagramLi DiagramLiTest'>
                    <span>문제</span>
                    <span>답34  </span>
                    <span>정답/오답</span>
                </li>
            </ul>
    }
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
            let url = "http://localhost:9000/getdiagram";
            try{
                let list = await axios.post(url,{
                    member_no : window.sessionStorage.getItem('no'),
                    cardset_no : window.sessionStorage.getItem('diagram')
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
                setDiagramList([...data]);

                data = [];
                let ch = [];
                chart.map((item,idx) => {
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

                last.map((item,idx) => {
                    let temp = {
                        cardset_no : item.cardset_no,
                        category : item.category,
                        method : item.method
                    }

                    ch.push(temp);
                })
             
                setChartList([...data]);
                setSelectCheck(...ch);
            }catch(e){
                console.log(e);
            }
        }

        getList();
        //폰트 트렌지션
        setTimeout(()=>{
            setMoreBetter(moreBetterSize);
            console.log('Works!');
        },1000);
    
        //웹 오답률 출력
        // setTimeout(()=>{
        //     for(var i=0; i<wrongloopCnt;i++){
        //         // eslint-disable-next-line no-loop-func
        //         ((x) => {
        //             setTimeout(() => {
        //                 let data ={
        //                     angle0:0,
        //                     angle: -(2*PI*(i/100)),
        //                     radius: 50, 
        //                     radius0:80
        //                 }
        //                 setMyWrongData([{...data}]);
        //                 // console.log('ㅎ'+x);
                        
        //             },x*500)
        //         })(i);
        //     }
        // },900);  
        // //모바일 오답률 출력
        // setTimeout(()=>{
        //     for(var i=0; i<wrongloopCnt;i++){
        //         // eslint-disable-next-line no-loop-func
        //         ((x) => {
        //             setTimeout(() => {
        //                 let dataM ={
        //                     angle0:0,
        //                     angle: -(2*PI*(i/100)),
        //                     radius: 40, 
        //                     radius0:60
        //                 }
        //                 setMyWrongDataM([{...dataM}]);
        //             },x*1000)
        //         })(i);
        //     }
        // },1500);  
        // //웹 정답률 출력
        // setTimeout(()=>{
        //     for(var i=0; i<godLoopCnt;i++){
        //         // eslint-disable-next-line no-loop-func
        //         ((x) => {
        //             setTimeout(() => {
        //                 let data ={
        //                     angle0:0,
        //                     angle: 2*PI*(i/100),
        //                     radius: 50, 
        //                     radius0:80
        //                 }
        //                 setMyGoodData([{...data}]);
        //                 // console.log('ㅗ'+x);
                      
        //             },x*1000)
        //         })(i);
        //     }
        // },500);   
        // //모바일 정답률 출력
        // setTimeout(()=>{
        //     for(var i=0; i<godLoopCnt;i++){
        //         // eslint-disable-next-line no-loop-func
        //         ((x) => {
        //             setTimeout(() => {
        //                 let dataM ={
        //                     angle0:0,
        //                     angle: 2*PI*(i/100),
        //                     radius: 40, 
        //                     radius0:60
        //                 }
        //                 setMyGoodDataM([{...dataM}]);
        //             },x*1000)
        //         })(i);
        //     }
        // },1100);  
       
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
        {/* -------------------- 여기서 map돌리면됨 */}
                        <span >전보다 6문제더 맞았어요!</span>
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
                        </Grid>

                        <Grid xs={6} sm={6} className='DiagramListChart05'>
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
                        </Grid>
                        <Grid xs={12} sm={12} className='DiagramListChart06'>
                                {
                                        
                                    items
                                }
                        </Grid>
                    </Hidden>
                </Grid>

                </div>
            )
}
export default DiagramList;