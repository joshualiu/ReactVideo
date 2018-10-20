import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Secret from './secret.js';
const API_KEY = Secret.API_KEY;
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('dudeperfect');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  
  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={ term => this.videoSearch(term) }/>
        <VideoDetail video={ this.state.selectedVideo }/>
        <VideoList 
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={ this.state.videos }/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container')); 