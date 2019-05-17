/* 
  React Gallery App.
  App.js
*/

import React, {Component} from 'react';

// routing components

import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';

// API key

import apiKey from './components/config';

//app components

import Header from './components/Header';
import Gallery from './components/Gallery';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import PageNotFound from './components/PageNotFound';

export default class App extends Component {

// set intiai state

  constructor() {
    super();
    this.state = {
      images : [],
      koreaImages : [],
      divingImages : [],
      travelImages : [],
      loading : true
    };
  }

// fetch data for navigation links

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=South+Korea&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        koreaImages: response.data.photos.photo,
        loading: false
      });
    })
    .catch(error => {
      console.log('An error occurred while getting data for South Korea images');
    });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=Scuba+Diving&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        divingImages: response.data.photos.photo
      });
    })
    .catch(error => {
      console.log('An error occurred while getting data for scuba diving images');
    });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=Travel&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        travelImages: response.data.photos.photo
      });
    })
    .catch(error => {
      console.log('An error occurred while getting data for travel images');
    });
  }

// fetch data on search

  getPhotos = (query) => {
    this.setState({
      loading : true
    })
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        images: response.data.photos.photo,
        loading : false
      });
    })
    .catch(error => {
      console.log('An error occurred while getting data for search images');
    });
  }

  // render app
  // conditional rendering (with a ternary operator) used to show a loading message while data is being fetched

  render() {
    return(
      <BrowserRouter>
        <div className="container">
          <Header />
            <SearchForm onSearch={this.getPhotos} />
            <Nav />
            <Switch>
            {
              (this.state.loading)
              ? <p>...Loading, please wait</p>
              :
            <Route path="/search" render={() => <Gallery data={this.state.images} name={'your search term'} />}/>
            }
            <Route exact path="/" />
            <Route path="/south-korea" render={() => <Gallery data={this.state.koreaImages} name={'South Korea'} /> }/>
            <Route path="/diving" render={() => <Gallery data={this.state.divingImages} name={'Scuba Diving'}/> } />
            <Route path="/travel" render={() => <Gallery data={this.state.travelImages} name={'Travel'} /> } />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}