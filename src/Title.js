import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home,Create,Search,Signin,Signup} from './contents';/*index.js호출*/
import Top from './top/Top';
// import { Grid } from '@material-ui/core';
// import MenuTitle from './menu/MenuTitle';
// import Menu  from './menu/Menu';
import Default from './menuDtail/Default';
// import Root from './Root';
 
const routes = [
  
  {
    // default page
    path: "/home/default",
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
    }
  ];

const Title=()=>{
    return (
        <div>
            <Top/>
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
export default Title;
