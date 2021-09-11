import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import StarshipDetails from '../sw-components/starship-details';

import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet updataInterval={20000}/>

              <Switch>
                <Route path="/" render={() => <h2>welcom to StarDB</h2>} exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets/:id?" component={PlanetPage}/>
                <Route path="/starships" exact component={StarshipPage}/>
                <Route path="/starships/:id"  
                render={({match}) => {
                  const {id} = match.params
                  return (
                        <StarshipDetails itemId={id}/>
                  )
                }}/>
                <Redirect to="/"/>
              </Switch>
              
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}