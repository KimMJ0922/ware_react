import React,{useState,useEffect} from 'react';
import {XYPlot, ArcSeries} from 'react-vis';
import './MenuDtail.css'
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import { Loop } from '@material-ui/icons';
const Diagram=()=>{

    const PI = Math.PI;

    const [totalCount,setTotalCount] =useState(58); //총 문제 갯수 
    const [rightCount, setRightCount] = useState(40); // 맞은갯수
    const [rightCountScore, setRightCountScore] = useState(rightCount/totalCount); //정답률
    const [wrongCountScore, setWrongCountScore] = useState(1-rightCountScore)  //오답률
    const [loopCnt, setLoopCnt] = useState(parseInt(rightCountScore*100));
    const [myGoodData, setMyGoodData] = useState([{
        angle0:0,
        angle: 0,
        radius: 50,
        radius0:80
    }]);

    useEffect(()=>{
        setTimeout(()=>{
            for(var i=0; i<loopCnt;i++){
                // eslint-disable-next-line no-loop-func
                ((x) => {
                    setTimeout(() => {
                        let data ={
                            angle0:0,
                            angle: -(2*PI*(i/100)),
                            radius: 50, 
                            radius0:80
                        }
                        setMyGoodData([{...data}]);
                        console.log(x);
                    },x*1000)
                })(i);
            }
        },1000);    
    },[]);
    
// 웹
    // const myGoodData = [
    //     {angle0:0, angle: -(2*PI*wrongCountScore) , radius: 50, radius0:80} //오답률 출력
    //   ]
    // const mynotGoodData = [
    //     {angle0: 0 , angle: 2*PI*rightCountScore ,  radius: 50, radius0: 80}// 정답률 출력
    // ]
// 모바일
    // const mygoodDataM = [
    //     {angle0:0, angle: -(2*PI*wrongCountScore) , radius: 30, radius0:40} //오답률 출력
    //   ]
    // const mynotGoodDataM = [
    //     {angle0: 0 , angle: 2*PI*rightCountScore ,  radius: 30, radius0: 40}// 정답률 출력
    // ]
    
    return(
        <div>
            <Grid container>
                 {/* 웹용 */}
                 <Hidden only={['xs','sm']}>
                    <Grid xs={12} md={12} lg={12}>
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
                                data={myGoodData}
                                color={'#f55e5e'}
                                colorType={'literal'}/>
                            {/* <ArcSeries
                                animation
                                radiusDomain={[0, 4]}
                                radiusType={'literal'}
                                center={{x: -1, y: 0}}
                                data={mynotGoodData}
                                color={'#289ee2'}
                                colorType={'literal'}/> */}
                        </XYPlot>
                    </Grid>
                </Hidden>
                 {/* 모바일용 */}
                 {/* <Hidden only={['md','lg','xl']}>
                    <Grid xs={12} md={12}>
                        <XYPlot
                            xDomain={[-5, 5]}
                            yDomain={[-5, 5]}
                            width={100}
                            height={100}>
                            <ArcSeries
                                animation
                                radiusDomain={[0, 4]}
                                radiusType={'literal'}
                                center={{x: -3, y: -2}}
                                data={mygoodDataM}
                                color={'#f55e5e'}
                                colorType={'literal'}/>
                            <ArcSeries
                                animation
                                radiusDomain={[0, 4]}
                                radiusType={'literal'}
                                center={{x: -3, y: -2}}
                                data={mynotGoodDataM}
                                color={'#289ee2'}
                                colorType={'literal'}/>
                        </XYPlot>
                    </Grid>
                </Hidden> */}
            </Grid>
            
        </div>
    )
}
export default Diagram;
