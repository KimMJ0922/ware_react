import React from 'react';
import {XYPlot, ArcSeries} from 'react-vis';
import './MenuDtail.css'
const Diagram=()=>{

    
    
    const totalCount =58; //총 문제 갯수
    const good = 57 ;// 맞은갯수
    const notGood = totalCount-good;
    const totalGoodPersant = good/totalCount*100; //정답률
    const totalNotGoodPersant =(totalCount-good)/totalCount*100;  //오답률

    console.log(totalGoodPersant.toFixed(0),totalNotGoodPersant.toFixed(0))
    const mygoodData = [
        {angle0:totalCount/10, angle: notGood/10, radius: 60, radius0:80} // 정답률 출력
      ]
    const mynotGoodData = [
        {angle0:totalCount/10, angle: good/10, radius: 40, radius0:60} // 오답률 출력
    ]
    return(
        <div>
                <XYPlot
                    xDomain={[-5, 5]}
                    yDomain={[-5, 5]}
                    width={200}
                    height={200}>
                    <ArcSeries
                        animation
                        radiusType={'literal'}
                        center={{x: -1, y: 0}}
                        data={mygoodData}
                        colorType={'literal'}/>
                    <ArcSeries
                        animation
                        radiusType={'literal'}
                        center={{x: -1, y: 0}}
                        data={mynotGoodData}
                        colorType={'literal'}/>
                </XYPlot>
        </div>
    )
}
export default Diagram;