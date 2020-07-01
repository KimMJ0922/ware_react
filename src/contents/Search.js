import React,{useEffect,useState} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';
import './content.css'
import { Hidden, Grid, Radio } from '@material-ui/core';
const Search=()=>{
    
    let history = useHistory();
    const [searchText, setSearchText] = useState(window.sessionStorage.getItem('searchText'));
    const [start,setStart] = useState(parseInt(window.sessionStorage.getItem('searchStart')));
    //라디오 버튼 정렬 기준
    const [sort, setSort] = useState(window.sessionStorage.getItem('searchSort'));
    //라디오 버튼 구분 기준
    const [division, setDivision] = useState(window.sessionStorage.getItem('searchDivision'));
    //라디오 포함 기준
    const [include, setInclude] = useState(window.sessionStorage.getItem('searchInclude'));

    const [searchList, setSearchList] = useState([]);

    //검색 텍스트 변경
    const changeSearchText = (e) => {
        setSearchText(e.target.value);
    }

    //라디오 버튼 클릭 시
    const selectChange = e => {
        let name = e.target.name;

        if(name === 'division'){
            setDivision(e.target.value);
        }else if(name === 'include'){
            setInclude(e.target.value);
        }else{
            setSort(e.target.value);
        }
    };

    useEffect(() => {
        getSearchList();
    },[])

    const getSearchList = () => {
        console.log(sort,division,include,searchText);
        let url = "http://localhost:9000/getcardsetsearchlist";
        let data = [];
        axios.post((url),{
            sort,
            division,
            include,
            searchText
        }).then((res) => {
            let slist = res.data.slist;
            slist.map((item) => {
                data.push({...item});
            })

            setSearchList([...data]);
        }).catch((err) => {

        })
    }

    const searchBtnClick = () => {
        getSearchList();
    }

    const goStudy = (cardset_no, open_scope, category) => {
        if(category === 'cardset'){
            if(open_scope === 'member'){
                let pass = window.prompt("비밀번호를 입력하세요");
                passCheck(cardset_no,pass);
            }else{
                window.sessionStorage.setItem('cardset_no',cardset_no);
                window.sessionStorage.setItem('study','cardset');
                setStudy();
            }
        }else{
            window.sessionStorage.setItem('cardset_no',cardset_no);
            window.sessionStorage.setItem('study','board');
            setStudy();
        }

        history.push('/study');
    }

    const passCheck = (no,pass) => {
        let url = "http://localhost:9000/cardsetpasscheck";
        axios.post(url,{
            no,
            open_password : pass
        }).then((res)=>{
            if(res.data){
                window.sessionStorage.setItem('cardset_no',no);
                window.sessionStorage.setItem('study','cardset');
                setStudy();
                history.push('/study');
            }else{
                alert("비밀번호가 맞지 않습니다.");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    //학습 저장
    const setStudy = () => {
        let url = "http://localhost:9000/setstudy";
        axios.post(url,{
            cardset_no : window.sessionStorage.getItem('cardset_no'),
            member_no : window.sessionStorage.getItem('no'),
            category : window.sessionStorage.getItem('study')
        }).then((res) => {
            setSession();
        }).catch((err) => {
            console.log(err);
        })
    }

    //더보기 버튼 눌렀을 때
    const moreBtnClick = () => {
        setStart(start+9);
        getSearchList();
    }

    const setSession = () => {
        window.sessionStorage.setItem('searchStart',start);
        window.sessionStorage.setItem('searchSort',sort);
        window.sessionStorage.setItem('searchDivision',division);
        window.sessionStorage.setItem('searchInclude',include);
        window.sessionStorage.setItem('searchText',searchText);
    }
    return(
        <div className='searchViewBox'>
            <Grid container className='searchView'> 
               <Grid xs={12} md={12} className='searchViewForm' >
                    <p>
                        <input type='text' className='searchBar' onChange={changeSearchText} value={searchText}/>
                        <span>
                            <button type='button' id="searchBtn" className='searchBarBtn' onClick={searchBtnClick}>검색</button> 
                        </span> 
                    </p>
               </Grid>
               <Grid xs={12} md={12} className='searchSelectForm' >
               <div className='searchViewRemocon'>
                   {/* 제목, 작성자 */}
                    <ul className='searchViewRemoconUl'>
                        <li className='searchViewRemoconLi'>
                            <Radio value="제목" name="division" onChange={selectChange} checked={division === '제목' ? 'checked' : ''}/><p>제목</p>
                        </li>
                        <li className='searchViewRemoconLi'> 
                            <Radio value="만든이" name="division" onChange={selectChange} checked={division === '제목' ? '' : 'checked'}/><p>만든이</p>
                        </li>
                        <li className='searchViewRemoconLi'>
                            <Radio value="최신순" name="sort" onChange={selectChange} checked={sort === '최신순' ? 'checked' : ''}/><p>최신순</p>
                        </li>
                        <li className='searchViewRemoconLi'> 
                            <Radio value="오래된순" name="sort" onChange={selectChange} checked={sort === '오래된순' ? 'checked' : ''}/><p>오래된순</p>
                        </li>
                        <li className='searchViewRemoconLi'>
                            <Radio value="검색단어" name="include" onChange={selectChange} checked={include === '검색단어' ? 'checked' : ''}/><p>검색 단어</p>
                        </li>
                        <li className='searchViewRemoconLi'>
                            <Radio value="검색단어포함" name="include" onChange={selectChange} checked={include === '검색단어포함' ? 'checked' : ''}/><p>검색 단어 포함</p>
                        </li>
                    </ul>
                </div>
                </Grid>
                {
                    searchList.map((item, idx) => {
                        if(idx < start){
                            return (
                                <>
                                    <Grid xs={12} sm={6} md={4} lg={4} xl={4} className='searchSelectList' onClick={(e) => goStudy(item.no, item.open_scopre, 'cardset')}>
                                        <div className='mycardList'>
                                            <div className='mycardSubject'>
                                                {item.title}
                                                {
                                                    item.open_scope === "public" ? 
                                                    <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                    item.open_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                    <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                                                }
                                                {
                                                    item.update_scope === "public" ? <img src="/icon/public.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                    item.update_scope === "member" ? <img src="/icon/member.png" className="scopeIcon" alt="" id={item.no}/> : 
                                                                                    <img src="/icon/private.png" className="scopeIcon" alt="" id={item.no}/>
                                                } 
                                            </div>
                                            <div className='mycardCount'>
                                                카드 수 : {item.cnt}
                                            </div>
                                            <div className='searchCardId'>
                                                <img src={item.profile} alt="" className='searchProfileImg'/>
                                                <span>
                                                    {
                                                        item.provider === 'kakao' ? <img src="/profile/kakao.png" alt="" style={{width:'20px', height:'20px'}}/> :
                                                        item.provider === 'google' ? <img src="/profile/google.png" alt="" style={{width:'20px', height:'20px'}}/> : 
                                                        <img src="/profile/ware.png" alt="" style={{width:'20px', height:'20px'}}/>
                                                    }
                                                    {item.name}
                                                </span>
                                            </div>
                                        </div>
                                    </Grid> 
                                </>
                            );
                        }
                    })
                }
                {
                    searchList.length >= start && 
                        <Grid xs={12} sm={12} md={12}  className='searchMoreForm'>
                        <button type="button" className='searchMoreBtn' onClick={moreBtnClick}>더보기</button>
                        </Grid>
                }
                
            </Grid>
            
        </div>
    )
}
export default Search;