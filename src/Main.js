import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import MainMap from './MainMap';
import App from './App';


function Main() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/home" component={() => <App/>}/>
                    <Route path="/mainmap" component={() => <MainMap/>}/>
                    <Redirect to="/home"/>
                </Switch>            
            </div>
        </BrowserRouter>
    )
}

export default Main
