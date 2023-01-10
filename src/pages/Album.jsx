import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      albumObj: [],
      favoriteList: [],
    };

    this.handleFavorite = this.handleFavorite.bind(this);
    this.loadFavorite = this.loadFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  async componentDidMount() {
    this.loadMusic();
  }

  async handleFavorite(musicId, isChecked) {
    this.setState({ loading: false });
    if (isChecked === false) {
      await addSong(musicId);
    } else {
      await removeSong(musicId);
    }
    this.loadFavorite();
  }

  async loadFavorite() {
    this.setState({ loading: false });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: true, favoriteList: favoriteSongs });
  }

  checkFavorite(songId) {
    const { favoriteList } = this.state;
    return favoriteList.some((songInfo) => (
      songInfo.trackId === songId || songInfo === songId
    ));
  }

  async loadMusic() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const albumInfo = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ albumObj: [...albumInfo], favoriteList: [...favoriteSongs] });
  }

  render() {
    const { loading, albumObj } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 className="titlePage">Album</h1>
        {albumObj.length > 1 && loading ? (
          <div className="albumMain">
            <div className="albumInfo">
              <img
                alt={ albumObj[0].collectionName }
                src={ albumObj[0].artworkUrl100 }
              />
              <div className="albumArtistTitle">
                <h3 data-testid="album-name">{albumObj[0].collectionName}</h3>
                <h4 data-testid="artist-name">{albumObj[0].artistName}</h4>
              </div>
            </div>
            <section className="albumSection">
              {albumObj.map(
                (album, index) => index > 0 && (
                  <div key={ album.trackName } className="musicPlayer">
                    <h5>{album.trackName}</h5>
                    <audio
                      data-testid="audio-component"
                      src={ album.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                    <label htmlFor={ album.trackId }>
                      Favorita
                      <input
                        type="checkbox"
                        data-testid={ `checkbox-music-${album.trackId}` }
                        name={ album.trackId }
                        onChange={ () => (
                          this.handleFavorite(
                            album, this.checkFavorite(album.trackId),
                          )
                        ) }
                        checked={ this.checkFavorite(album.trackId) }
                      />
                    </label>
                  </div>
                ),
              )}
            </section>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Album;
