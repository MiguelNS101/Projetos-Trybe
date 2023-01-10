import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      loading: false,
      showSearchBox: true,
      ButtonCheck: true,
      albumsList: [],
      ArtistName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  handleChange({ target }) {
    this.setState({ searchValue: target.value }, () => {
      const { searchValue } = this.state;
      const MIN_SEARCH = 2;
      if (searchValue.length >= MIN_SEARCH) {
        this.setState({ ButtonCheck: false });
      } else {
        this.setState({ ButtonCheck: true });
      }
    });
  }

  async searchHandler(searchValue) {
    this.setState({
      loading: true,
      showSearchBox: false,
    });
    const albums = await searchAlbumsAPI(searchValue);
    this.setState({
      loading: false,
      showSearchBox: true,
      ArtistName: searchValue,
      albumsList: [...albums],
      searchValue: '',
    });
  }

  render() {
    const {
      searchValue,
      ButtonCheck,
      loading,
      showSearchBox,
      albumsList,
      ArtistName,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1 className="titlePage">Search</h1>
        {showSearchBox && (
          <section className="searchSection">
            <label htmlFor="searchAlbum">
              Search:
              <input
                data-testid="search-artist-input"
                type="text"
                name="searchAlbum"
                value={ searchValue }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ ButtonCheck }
              onClick={ () => this.searchHandler(searchValue) }
            >
              Pesquisar
            </button>
          </section>
        )}
        { (albumsList.length > 1) ? (
          <div>
            <h3>
              { `Resultado de álbuns de: ${ArtistName}` }
            </h3>
            <section className="albumsSection">
              { albumsList.map((album) => (
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  key={ album.collectionId }
                >
                  <div className="albumCard">
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <p>{ album.collectionName }</p>
                    <p>{ album.artistName }</p>
                  </div>
                </Link>
              )) }
            </section>
          </div>
        ) : (<p>Nenhum álbum foi encontrado</p>)}
        {loading && <Loading />}
      </div>
    );
  }
}

// Search.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default Search;
