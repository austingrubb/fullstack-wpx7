import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home'

export default <Switch>
   <Route path='/dashboard' component={Dashboard}/>
   <Route path='/' component={Home}/>
</Switch>