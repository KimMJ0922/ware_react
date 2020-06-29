import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './content.css'
const Search=()=>{
    const [searchText, setSearchText] = useState('');
    const [start,setStart] = useState(9);
    const [sort, setSort] = useState('최신순');
    const [searchList, setSearchList] = useState([]);

    //검색 텍스트 변경
    const changeSearchText = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        getSearchList();
    },[])

    const getSearchList = () => {
        let url = "http://localhost:9000/getcardsetsearchlist";
        let data = [];
        axios.post((url),{
            start,
            sort,
            searchText
        }).then((res) => {
            let slist = res.data.slist;
            slist.map((item) => {
                data.push({...item});
            })

            setSearchList([...data]);
        }).catch((err) => {

        })
    }
    return(
        <div>
            <input type="text" value={searchText} onChange={changeSearchText}/>
            <button type="button">검색</button>
            {
                searchList.map((item, idx) => {
                    return (
                        <>
                            {item.title}<br/>
                            {item.comment}<br/>
                        </>
                    )
                })
            }
        </div>
    )
}
export default Search;