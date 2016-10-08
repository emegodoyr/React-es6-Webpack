import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {videos: [], selectedVideo: null};
    /*
      cuando se crea el componente llamo al metodo videoSearch
      envio el string para buscar un video inicial por defecto
    */
    this.videoSearch('major lazer');
  }

  /*
    Ocupo el parametro en la api para encontrar los videos asociados
    cambio el state {videos: [], selectedVideo: null}  llenando el arreglo de videos
    inicial con los videos recibidos de la api y selectedVideo con el primero del arreglo
    que va a ser el video principal

    Al cambiar el state se hace un render en este componente y los componentes
    hijos
  */

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ videos: videos, selectedVideo: videos[0]
      });
    });
  }

  /*
    envío el metodo {videoSearch} al componente SearchBar
    desde este componente lo puedo usar como this.props.onSearchTermChange(term);

    envío el atributo del state {selectedVideo} al componente VideoDetail
    desde este componente lo puedo usar como {video}

   uso arrow function es6 para enviar una funcion que recibirá como parametro el video seleccionado {selectedVideo}
   y cambiar el state this.setState({selectedVideo} con la nueva seleccion desde el componente VideoList
   Tambien envío todos los videos cargados en el atributo videos [] del state
  */

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect = {selectedVideo => this.setState({selectedVideo}) } videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));