import React,{useState,useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home,Create,Search,Signin,Signup,ChangePassword} from './contents';/*index.js호출*/
import Board from './board/Board';
import Main from './main/Main';
import Top from './top/Top';
import Default from './menuDtail/Default';

const Title = () => {
  const routes = [
    {
      // default page
      path: "/home/default",
      component: Home,
    },
      {
        path: "/home",
        component: Home,
      },
      {
          path: "/search",
          component: Search
      },
      {
          path: "/create",
          component: Create
      },
      {
          path: "/signin",
          component: Signin
      },
      {
          path: "/signup",
          component: Signup
      },
      {
        path: "/board",
        component: Board
      },
      {
        path:"/forgotten",
        component: ChangePassword
      },
      {
        path:"/",
        component: Main
      },
      {
        path:'/upload',

      }
    ];
    const [nowPath, setPath] = useState('');
    const [pro, setPro] = useState(window.sessionStorage.getItem('profile'));
    useEffect(() => {
      let email = window.sessionStorage.getItem('email');
      let page = ['/','/signin','/signup','/forgotten'];
      //로그인 안한 상태에서 메인을 제외한 페이지로 강제 이동시
      //메인 페이지로 이동
      if(nowPath!==''){
        if(page.indexOf(nowPath) === -1 && email === null){
          window.location.replace('/')
        }
        //로그인 한 상태에서 메인으로 강제로 가면 
        //전 페이지로 이동
        else if(email !== null && page.indexOf(nowPath) !== -1){
          window.history.back();
        }
      }
    },[nowPath]);

    return (

        <div style={{fontSize: '16px'}}>
          <Top path={nowPath} />
          <Switch > 
            {/*<Route exact path="/" component={Main}></Route>
            <Route exact path="/home/default" component={Home}></Route>
            <Route exact path="/home/default" component={Home}></Route>*/}
              {
                routes.map((route, i) => {
                  return (
                    <RouteWithSubRoutes key={i} {...route} />
                    
                  )
                })
              }
            
              {/* 이거 쫌짜증남 살짝 이해가 안감 */}
          </Switch>
        </div>
    )
  

  // <Route>를위한 특별한 래퍼
  // "sub"-routes에 전달하여 라우팅
  // 렌더링하는 구성 요소에 prop.
  function RouteWithSubRoutes(route) {
    setPath(route.path);
    return (
      <Route
         render={props => (
        // 중첩을 유지하기 위해 하위 경로를 전달
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
}

 

export default Title;
