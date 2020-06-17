import React,{useState, useEffect} from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import BoardItems from './BoardItems';
import './Board.css'

import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Grid } from '@material-ui/core';

const BoardList=()=>{ 
    const [boardData, setBoardData] = useState([]);
    const [countNum, setCountNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       '& > *': {
    //         margin: theme.spacing(2),
    //         width: '50ch',
    //       },
    //     },
    //     button1: {
    //       margin: theme.spacing(2),
    //       width: '5ch',
    //       height: '7ch',
    //     },
    //     button2: {
    //         margin: theme.spacing(2),
    //         width: '15ch',
    //         height: '7ch',
    //     },
    // }));
    // const classes = useStyles();

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

    useEffect(()=>{
        getData();
        BoardCount();
    },[pageNum])
    
    return (
        <>
        <Grid container className='boardTableSubject'> 
            <Grid xs={12} md={6}>
                <div className='boardSearchForm'>
                    <form  noValidate autoComplete="off">
                        <TextField className='boardSearchBar'  type="search"  />
                        <Button className='boardSearchBtn' >검색</Button>
                    </form>
                </div> 
            </Grid>
            <Grid xs={12} md={6}>
            <div className='boardSearchForm'>
                  
                 최신순/ 인기순 / 정확도순 
                </div>
            </Grid>
            
            
            
               
                    {/* <Grid xs={1} md={1}>
                        <div className='boardTableTitle'> 번호</div>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <div className='boardTableTitle'>작성자</div>
                    </Grid>
                    <Grid xs={6} md={6}>
                        <div className='boardTableTitle'>제목</div>
                    </Grid>
                    <Grid xs={1} md={1}>
                        <div className='boardTableTitle'>조회수</div>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <div className='boardTableTitle'>작성일</div>
                    </Grid> */}
                
        
            {
                boardData.map((row,index) => (
                    <BoardItems row={row} index={index}/>
                ))
            }   
                  <Grid xs={4} md={4}>
                <div>
                   &nbsp;  
                </div>
            </Grid>
            <Grid xs={4} md={4}>
            <div className="BoardPagination">
                <MemoryRouter initialEntries={['/home/board']} initialIndex={0}>
                    <Route>
                        {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const page = parseInt(query.get('page') || '1', 10);
                        setPageNum(page);
                        return (
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
                        );
                        }}
                    </Route>
                </MemoryRouter>
            </div>
            </Grid>
            <Grid xs={4} md={4}>
                <div>
                   &nbsp; 
                </div>
            </Grid>
            <Grid xs={12} md={12}>
            <div className="BoardInsert">
                    <Link to="/home/board/insert">
                        <Button variant="contained" color="primary" >게시물 작성</Button>
                        {/* className={classes.button2} */}
                    </Link>
                </div>
            </Grid>
           
        </Grid>
        
        </>
    )
}
export default BoardList;