import React,{useState} from 'react';
import {BrowserRouter} from 'react-router-dom'
import Title from './Title'
// import Exam from './Exam'
const Root=()=>{
    
    return(
        // <Exam/>
        <BrowserRouter>{/* 새로고침 하지 않고도 페이지 주소를 교체 */}
            <Title/>
        </BrowserRouter>
    )
}
export default Root;