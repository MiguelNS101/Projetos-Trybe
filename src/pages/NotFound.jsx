import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from './Header';
import Loading from './Loading';

class NotFound extends Component {
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
      <div data-testid="page-not-found">
        <Header />
        <h1>NotFound</h1>
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

// NotFound.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default NotFound;
