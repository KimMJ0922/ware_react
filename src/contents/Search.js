import React, { useState } from 'react';
import './content.css'
import { Hidden, Grid, Radio } from '@material-ui/core';
const Search=()=>{

    // radio 값바꾸기
    const [selectedValue, setSelectedValue] = useState("");
    const selectChange = event => {
        setSelectedValue(event.target.value);
        window.sessionStorage.setItem("select",event.target.value);
    };
    return(
        <div>
            <Grid className='searchView'> 
               <Grid xs={12} md={12} className='searchViewForm' >
                    <p>
                        <input type='text' className='searchBar' />
                        <span>
                            <button type='button' className='searchBarBtn'>검색</button> 
                        </span> 
                    </p>
               </Grid>
               <Grid xs={12} md={12} className='searchSelectForm' >
               <div className='searchViewRemocon'>
                    <ul className='searchViewRemoconUl'>
                        <li className='searchViewRemoconLi'> <Radio value="최신결과"   onChange={selectChange}/><p>최신 결과</p></li>
                        <li className='searchViewRemoconLi'> <Radio value="오래된결과"   onChange={selectChange}/><p>오래된 결과</p></li>
                        <li className='searchViewRemoconLi'> <Radio value="검색단어"   onChange={selectChange} /><p>검색 단어</p></li>
                        <li className='searchViewRemoconLi'> <Radio value="검색단어포함"   onChange={selectChange} /><p>검색 단어 포함</p></li>
                    </ul>
                </div>
                </Grid>

                {/* 이 Grid 를 반복시키면됨 -시작- */}
                <Grid xs={12} sm={6} md={4}  className='searchSelectList'>
                        <div className='mycardList'>
                            <div className='mycardSubject'>
                                123123123
                            </div>
                            <div className='mycardCount'>
                            문제
                            </div>
                            <div className='searchCardId'>
                                <img src="/profile/kakao.png" alt="" className='searchProfileImg'/>
                                <span>
                                    username
                                </span>
                                <span>2020-10-10</span>
                            </div>
                        </div>
                </Grid> 
                {/* 이 Grid 를 반복시키면됨 -종료- */}
            </Grid>
            
        </div>
    )
}
export default Search;