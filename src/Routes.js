import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListDisplay from './components/ListDisplay';
import ItemDisplay from './components/ItemDisplay';

export default (
    <Switch>
        <Route path='/:id' component={ItemDisplay}/>
        <Route path='/' component={ListDisplay} />
    </Switch>
)