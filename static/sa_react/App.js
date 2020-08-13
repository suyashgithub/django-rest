import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Shop from './src/shop.js';

const routing = (
  <Router>
      <Route path="/index/" component={Shop} />
  </Router>
)
ReactDOM.render(routing, document.getElementById('app'))
