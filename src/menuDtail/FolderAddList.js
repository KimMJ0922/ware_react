import React,{useState,useEffect} from "react";

const FolderAddList = (props) => {
    const [card,setCard] = useState(props.card);
    const [folderNo, setFolderNo] = useState(props.no);
    const [study, setStudy] = useState(props.study);
    const [list,setList] = useState([]);
    const [chList, setChList] = useState([]);

    //폴더 리스트 중에서 해당 폴더의 리스트만 따로 나누기
    const listDiv = () => {
        let data = [];
        card.map((item) => {
            if(item.folder_no === parseInt(folderNo)){
                data.push({...item});
            }
        })

        setList([...data]);
        let data2=[];
        study.map((studyItem,i) => {
            data.map((listItem,idx) => {
                if(studyItem.category === listItem.category && studyItem.cardset_no === listItem.cardset_no){
                    data2.push({...studyItem,checked : 'true'});
                }
            })
        })

        setChList([...data2]);
        let data3=[];
        study.map((studyItem,i) => {
            let re = data.map((listItem,idx) => {
                if(studyItem.category === listItem.category && studyItem.cardset_no === listItem.cardset_no){
                    return false;
                }else{
                    return true;
                }
            })

            if(re.indexOf(false) === -1){
                data3.push({...studyItem,checked : ''});
            }
        })
        
        let lastData = []
        data2.map((item) => {
            lastData.push({...item});
        })

        data3.map((item) => {
            lastData.push({...item});
        })

        setList([...lastData]);
    }
    useEffect(() => {
        listDiv();
    },[])

    const checkboxClick = (e) => {
        let no = e.target.value;
        list.map((item) => {
            if(item.no === parseInt(no)){
                if(item["checked"] === ''){
                    item["checked"] = 'true';
                }else{
                    item["checked"] = '';
                }
            }
        })

        setList([...list]);
    }
    return(
        <>
            {
                list.map((item)=>{
                    return (
                        <>
                            <div>
                                <input type="checkbox" name="stlist" value={item.no} checked={item.checked} onClick={checkboxClick}/>{item.title}(카드수 : {item.cnt})<br/>
                                <img src={item.profile} alt="" style={{width:'40px', height:'40px'}}/>{item.name}
                            </div>
                        </>
                    )
                })  
            }
            {/* {
                list.map((item)=>{
                    return (
                        <>
                            <div>
                                <input type="checkbox" name="stlist" value={item.no} checked={item.checked}/>{item.title}({item.category})<br/>
                                <img src={item.profile} alt="" style={{width:'40px', height:'40px'}}/>{item.name}
                            </div>
                        </>
                    )
                }) 
            } */}
            {/* {
                study.map((studyItem,idx) => {
                    return(
                        <>
                            {
                               re = card.map((cardItem,i) => {
                                    temp = studyItem;
                                    if(cardItem.folder_no === parseInt(no)){
                                        if(cardItem.cardset_no === studyItem.cardset_no && cardItem.category === studyItem.category){
                                            return(
                                                <>
                                                
                                                    <div>
                                                        <input type="checkbox" name="stlist" value={studyItem.no} checked/>{studyItem.title}({studyItem.category})<br/>
                                                        <img src={studyItem.profile} alt="" style={{width:'40px', height:'40px'}}/>{studyItem.name}
                                                    </div>
                                                </>
                                            )
                                        }else{
                                            return false
                                        }
                                        // if(i === card.length-1){
                                        //     return(
                                        //         <>
                                                
                                        //             <div>
                                        //                 <input type="checkbox" name="stlist" value={temp.no}/>{temp.title}({temp.category})<br/>
                                        //                 <img src={temp.profile} alt="" style={{width:'40px', height:'40px'}}/>{temp.name}
                                        //             </div>
                                        //         </>
                                        //     )
                                        // }
                                    }
                                })
                            }
                        </>
                    )               
                })
            } */}
        </>
    );
}

export default FolderAddList;