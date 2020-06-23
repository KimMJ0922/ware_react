import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Axios from 'axios';
import BoardItems from './BoardItems';
import './Board.css'

import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Grid, Radio } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const BoardList=()=>{ 
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [boardData, setBoardData] = useState([]);
    const [countNum, setCountNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);

    // radio 값바꾸기
    const [selectedValue, setSelectedValue] = useState("최신순");

    const selectChange = event => {
        setSelectedValue(event.target.value);
    };
    const searchChange = event => {
        setSearch(event.target.value);
    };

    useEffect(()=>{
        const getData = async () =>{
            try {
                const data = await Axios.get(
                    "http://localhost:9000/board/list?pageNum="+pageNum+"&search="+search+"&select="+selectedValue
                );
                setBoardData(data.data);
            } catch (e) {
                console.log(e);
            }
        }
    
        const BoardCount = async () =>{
            try {
                const data = await Axios.get(
                    "http://localhost:9000/board/count?search="+search
                );
                setCountNum(data.data);
            } catch (e) {
                console.log(e);
            }
        }
        setTimeout(()=>{
            getData();
        },100);
        BoardCount();
    },[pageNum, search, selectedValue])
    var items = null;
    if(boardData.length !== 0){
        items = boardData.map((row) => (
            <BoardItems row={row} pageNum={pageNum}/>
        ));
    }else {
        items = 
        <Grid xs={12} md={12}>
            <div>
            검색 결과가 없습니다.
            </div>
        </Grid>;
    }
    return (
        <>
        <Grid container className='boardTableSubject'> 
            <Grid xs={12} md={6}>
                <div className='boardSearchForm'>
                    <form  noValidate autoComplete="off">
                        <TextField className='boardSearchBar' onChange={searchChange} type="search"/>
                        <Button id='boardSearchBtn' ><Search/></Button>
                    </form>
                </div> 
            </Grid>
            <Grid xs={12} md={6}>
                <div className='boardSearchForm'>
                <Radio
                    checked={selectedValue === "최신순"}
                    onChange={selectChange}
                    value="최신순"
                    name="radio-button-demo"
                    className="boardSearchRadio"
                />최신순
                
                <Radio
                    checked={selectedValue === "조회순"}
                    onChange={selectChange}
                    value="조회순"
                />조회순
                <Radio
                    checked={selectedValue === "낮은가격순"}
                    onChange={selectChange}
                    value="낮은가격순"
                />낮은가격순
                <Radio
                    checked={selectedValue === "높은가격순"}
                    onChange={selectChange}
                    value="높은가격순"
                />높은가격순
                </div>
                
            </Grid>
            {
                items
            }   
            {/* 여백채우기용 */}
            <Grid xs={12} md={12}>
                <div>
                   &nbsp;  
                </div>
            </Grid>
           
            <Grid xs={12} md={12}>
            <div className="BoardPagination">
                <BrowserRouter>
                    <Route>
                        {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const page = parseInt(query.get('page') || '1', 10);
                        setPageNum(page);
                        return (
                            <div>
                            <Pagination
                                page={page}
                                count={Math.ceil(countNum/9)}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/home/board${item.page === 1 ? `?page=${item.page}` : `?page=${item.page}`}`}
                                        {...item}
                                    />
                            )}
                            />
                            </div>
                        );
                        }}
                    </Route>
                </BrowserRouter>
            </div>
            </Grid>

            {/* 여백채우기용 */}
            <Grid xs={12} md={12}>
                <div>
                   &nbsp;  
                </div>
            </Grid>
            
            <Grid xs={12} md={12}>
            <div className="BoardInsert">
                    <Link to="/home/board/insert">
                        <Button id='BoardInsertBtn'  variant="contained" color="primary" >장터에 올리기</Button>
                    </Link>
                </div>
            </Grid>
        </Grid>
        </>
    )
}
export default BoardList;