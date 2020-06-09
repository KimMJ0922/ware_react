import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainTitle from './MainTitle'
// import Exam from './Exam'

const Root=()=>{
    return(
        // <Exam/>
        <BrowserRouter>{/* 새로고침 하지 않고도 페이지 주소를 교체 */}
            <MainTitle/>
        </BrowserRouter>
    )
}
export default Root;