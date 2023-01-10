import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
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
      <div data-testid="page-profile-edit">
        <Header />
        <h1>ProfileEdit</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="">
            <h4>{userObj.name}</h4>
            <label htmlFor="userName">
              User Name:
              <input
                data-testid="edit-input-name"
                type="text"
                name="userName"
                // value={ loginName }
                // onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="emailEdit">
              Email:
              <input
                data-testid="edit-input-email"
                type="text"
                name="emailEdit"
                // value={ loginName }
                // onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="description">
              Description:
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                // value={ loginName }
                // onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="image">
              Image:
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                // value={ loginName }
                // onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="edit-button-save"
              // disabled={ loginButtonCheck }
              // onClick={ () => this.saveAndLoad(loginName) }
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

// ProfileEdit.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default ProfileEdit;
