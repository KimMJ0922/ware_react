import React,{useState,useEffect} from 'react';
import DiagramChart from './DiagramChart';
import { Button } from '@material-ui/core';
import axios from 'axios';

const Diagram=({location})=>{
    const [diagramList, setDiagramList] = useState([]);
    const [diagramLastList, setDiagramLastList] = useState([]);
    const [radioCheck, setRadioCheck] = useState([]);
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
                setRadioCheck([...ch]);
            }catch(e){
                console.log(e);
            }
        }

        getList();
    },[])
    
    return(
        <>
            {/* 여기다가 map돌리면됨 일부러 파일 분류했음 -엄준식 */}
            {
                radioCheck.map((last,i) => {
                    return (
                        <>
                            {
                                diagramList.map((item,j)=>{
                                    if(item.cardset_no === last.cardset_no && item.method === last.method && item.category === last.category){
                                        return (
                                            <>
                                                <DiagramChart item={item} setRadioCheck={setRadioCheck} radioCheck={radioCheck} diaList = {diagramList} chartList={chartList}/>
                                            </>
                                        )
                                    }
                                })
                            }
                        </>
                    )  
                })
            }
            {/*  */}
        </>
    )
}
export default Diagram;
