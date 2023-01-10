import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      // loginName: '',
      loading: true,
      userObj: [],
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getUser().then((user) => this.setState({ userObj: user, loading: false }));
  }

  render() {
    const { loading, userObj } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <h1 className="titlePage">Profile</h1>
        { loading ? (
          <Loading />
        ) : (
          <div className="albumMain">
            <img src={ userObj.image } data-testid="profile-image" alt={ userObj.name } />
            <h4>{userObj.name}</h4>
            <h4>{userObj.email}</h4>
            <h4>{userObj.description}</h4>
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </div>
        )}
      </div>
    );
  }
}

// Profile.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default Profile;
