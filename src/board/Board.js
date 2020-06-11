import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import BoardList from './BoardList';
import BoardInsert from './BoardInsert';
import BoardUpdate from './BoardUpdate';

import './Board.css';

const Board=()=>{
    return (
        <Router>
            <Route exact path="/board" component={BoardList} />
            <Route exact path="/board/insert" component={BoardInsert} />
            <Route exact path="/board/update" component={BoardUpdate} />
        </Router>
    )
}
export default Board;