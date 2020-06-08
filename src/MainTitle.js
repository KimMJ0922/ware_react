import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home,Create,Search,Signin,Signup} from './contents';/*index.js호출*/
import {Main} from './main';
import MainTop from './top/MainTop';
// import { Grid } from '@material-ui/core';
// import MenuTitle from './menu/MenuTitle';
// import Menu  from './menu/Menu';
import Default from './menuDtail/Default';
import Title from './Title';
// import Root from './Root';
 
const routes = [
  
  {
    // default page
    path: "/home",
    component: Title,
  },
    {
      path: "/",
      component: Main
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
    }
  ];

const MainTitle=()=>{
    return (
        <div>
            
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
                {/* 이거 쫌짜증남 살짝 이해가 안감 */}
            </Switch>
        </div>
    )
}
 
// <Route>를위한 특별한 래퍼
// "sub"-routes에 전달하여 라우팅
// 렌더링하는 구성 요소에 prop.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // 중첩을 유지하기 위해 하위 경로를 전달
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
export default MainTitle;
