import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenSearchPage from './ScreenSearchPage';
import ScreenResultPage from './ScreenResultPage';
import ScreenDetailPage from './ScreenDetailPage';

function App() {

  return (
      <Router>
        <Switch>
          <Route component={ScreenSearchPage} path="/" exact />
          <Route component={ScreenResultPage} path="/search/:searchText" exact />
          <Route component={ScreenDetailPage} path="/article/:id" exact />
        </Switch>
      </Router>
  );
}

export default App;
