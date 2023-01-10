import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
// import PropTypes from 'prop-types';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => this.setState({ name: user, loading: false }));
  }

  render() {
    const { loading, name } = this.state;

    return (
      <header data-testid="header-component">
        <div className="title-use">
          <h1>TrybeTunes</h1>
          <p data-testid="header-user-name">{name.name}</p>
          {loading && <Loading />}
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

// Header.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default Header;
