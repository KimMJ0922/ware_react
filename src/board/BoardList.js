import React,{useState, useEffect} from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import BoardItems from './BoardItems';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const BoardList=()=>{ 
    const [boardData, setBoardData] = useState([]);
    const [countNum, setCountNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(2),
            width: '50ch',
          },
        },
        button1: {
          margin: theme.spacing(2),
          width: '5ch',
          height: '7ch',
        },
        button2: {
            margin: theme.spacing(2),
            width: '15ch',
            height: '7ch',
        },
    }));
    const classes = useStyles();

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
        <div className="board">
            <div className="BoardTop"></div>
            <div className="BoardContainer">
            <div className="BoardItem" style={{width:"98%"}}>
                <span style={{width:"10%"}}>게시물 번호</span>
                <span style={{width:"20%"}}>작성자</span>
                <span style={{width:"45%"}}>제목</span>
                <span style={{width:"10%"}}>조회수</span>
                <span style={{width:"15%"}}>작성일</span>
            </div>
            {
                boardData.map((row,index) => (
                    <BoardItems row={row} index={index}/>
                ))
            }   
            </div>
            <div className="BoardPagination">
                <MemoryRouter initialEntries={['/board']} initialIndex={0}>
                    <Route>
                        {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const page = parseInt(query.get('page') || '1', 10);
                        setPageNum(page);
                        return (
                            <Pagination
                                page={page}
                                count={Math.ceil(countNum/6)}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/board${item.page === 1 ? `?page=${item.page}` : `?page=${item.page}`}`}
                                        {...item}
                                    />
                            )}
                            />
                        );
                        }}
                    </Route>
                </MemoryRouter>
            </div>
            <div className="BoardBottom">
                <div className="BoardSearch">
                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-search" type="search" variant="outlined" />
                        <Button variant="contained" color="primary" className={classes.button1}>검색</Button>
                    </form>
                </div>
                <div className="BoardInsert">
                    <Link to="/board/insert">
                        <Button variant="contained" color="primary" className={classes.button2}>게시물 작성</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default BoardList;