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
            <Route exact path="/board" component={BoardList} />
            <Route exact path="/board/insert" component={BoardInsert} />
            <Route exact path="/board/update" component={BoardUpdate} />
            <Route exact path="/board/item/:board_no" component={BoardItem} />
        </Router>
    )
}
export default Board;