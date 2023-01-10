import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from './Header';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      // loginName: '',
      loading: false,
      redirect: false,
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { loading, redirect } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <h1 className="titlePage">Profile</h1>
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

// MusicCard.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default MusicCard;
