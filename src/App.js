import React from 'react';
import Top from './top/Toplist';
import Content from './Content';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <Link exact path='/'><Top/></Link>
      <Link exact path='/content'><Content/></Link>
      <BrowserRouter>
      <Switch>
      <Route  path="/"><Top/></Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
