import React,{useState,useEffect} from 'react';
import DiagramChart from './DiagramChart';
import { Button } from '@material-ui/core';
import axios from 'axios';

const Diagram=()=>{
    const [diagramList, setDiagramList] = useState([]);
    const [diagramLastList, setDiagramLastList] = useState([]);
    useEffect(()=>{
        const getList = async() => {
            let url = "http://localhost:9000/getdiagramlist";
            try{
                let list = await axios.post(url,{
                    member_no : window.sessionStorage.getItem('no')
                });

                let dilist = list.data.rlist;
                let lastList = list.data.lastList;

                let data = [];
                dilist.map((item,idx) => {
                    let temp = {
                        no : item.no,
                        cardset_no : item.cardset_no,
                        category : item.category,
                        rightcnt : item.rightcnt,
                        wrongcnt : item.wrongcnt,
                        method : item.method,
                        recordday : item.recordday
                    }
                    data.push(temp);
                });
                setDiagramList([...data]);

                data = [];
                lastList.map((item,idx) => {
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

                setDiagramLastList([...data]);
                
            }catch(e){
                console.log(e);
            }
        }

        getList();

        console.log(diagramList);
    },[])
    
    useEffect(() => {
        console.log(diagramList.length);
    },[diagramList])
    return(
        <>
            {/* 여기다가 map돌리면됨 일부러 파일 분류했음 -엄준식 */}
            {
                diagramLastList.map((item,idx) => {
                    return (
                        <>
                            <DiagramChart item={item}/>
                        </>
                    )
                })
            }
            {/*  */}
        </>
    )
}
export default Diagram;
