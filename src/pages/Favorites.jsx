import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
// import MusicCard from './MusicCard'
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      // loginName: '',
      loading: false,
      loadPage: true,
      favoriteList: [],
    };

    // this.handleChange = this.handleChange.bind(this);
    this.loadFavorite = this.loadFavorite.bind(this);
  }

  componentDidMount() {
    this.loadFavorite();
  }

  async handleFavorite(musicId, isChecked) {
    this.setState({ loading: false, loadPage: true });
    if (isChecked === false) {
      await addSong(musicId);
    } else {
      await removeSong(musicId);
    }
    this.loadFavorite();
  }

  checkFavorite(songId) {
    const { favoriteList } = this.state;
    return favoriteList.some((songInfo) => (
      songInfo.trackId === songId || songInfo === songId
    ));
  }

  async loadFavorite() {
    this.setState({ loading: false, loadPage: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: true, favoriteList: favoriteSongs, loadPage: false });
  }

  render() {
    const { loading, favoriteList, loadPage } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loadPage && <Loading />}
        {favoriteList.length > 0 && loading ? (
          <div className="FavoriteMain">
            <section className="FavoriteSection">
              {favoriteList.map(
                (album) => (
                  <div key={ album.trackName } className="musicPlayer">
                    <img
                      alt={ album.collectionName }
                      src={ album.artworkUrl100 }
                    />
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
                        id={ album.trackId }
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
          ''
        )}
      </div>
    );
  }
}

// Favorites.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default Favorites;
