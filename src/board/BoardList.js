import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    
    const [boardData, setBoardData] = useState([]);
    const [countNum, setCountNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);

    // radio 값바꾸기
    const [selectedValue, setSelectedValue] = React.useState("최신순");
    const selectChange = event => {
        setSelectedValue(event.target.value);
      };

    useEffect(()=>{
        console.log("list호출");
        const getData = async () =>{
            try {
                const data = await Axios.get(
                    "http://localhost:9000/board/list?pageNum="+pageNum
                );
                setBoardData(data.data);
            } catch (e) {
                console.log(e);
            }
        }
    
        const BoardCount = async () =>{
            try {
                const data = await Axios.get(
                    "http://localhost:9000/board/count"
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
    },[pageNum])
    
    return (
        <>
        <Grid container className='boardTableSubject'> 
            <Grid xs={12} md={6}>
                <div className='boardSearchForm'>
                    <form  noValidate autoComplete="off">
                        <TextField className='boardSearchBar'  type="search"  />
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
                    checked={selectedValue === "최소가격"}
                    onChange={selectChange}
                    value="최소가격"
                />최소가격
                <Radio
                    checked={selectedValue === "최대가격"}
                    onChange={selectChange}
                    value="최대가격"
                />최대가격
                </div>
                
            </Grid>
            {
                boardData.map((row,index) => (
                    <BoardItems row={row} pageNum={pageNum}/>
                ))
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