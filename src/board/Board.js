import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import BoardList from './BoardList';
import BoardInsert from './BoardInsert';
import BoardUpdate from './BoardUpdate';
import BoardItem from './BoardItem';

import './Board.css';

const Board=()=>{
    return (
        <Router>
            <Route exact path="/home/board" component={BoardList} />
            <Route exact path="/home/board/insert" component={BoardInsert} />
            <Route exact path="/home/board/update" component={BoardUpdate} />
            <Route exact path="/home/board/item/:board_no/:pageNum" component={BoardItem} />
        </Router>
    )
}
export default Board;