import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      loginButtonCheck: true,
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveAndLoad = this.saveAndLoad.bind(this);
  }

  handleChange({ target }) {
    this.setState({ loginName: target.value }, () => {
      const { loginName } = this.state;
      const MIN_USERNAME = 3;
      if (loginName.length >= MIN_USERNAME) {
        this.setState({ loginButtonCheck: false });
      } else {
        this.setState({ loginButtonCheck: true });
      }
    });
  }

  async saveAndLoad(loginName) {
    this.setState({ loading: true });
    const userObj = {
      name: loginName,
      email: `${loginName}@email.com`,
      image: 'Placeholder image',
      description: 'Placeholder description',
    };
    await createUser(userObj);
    this.setState({ redirect: true });
  }

  render() {
    const { loginName, loginButtonCheck, loading, redirect } = this.state;

    return (
      <div data-testid="page-login" className="loginPage">
        <h1 className="loginTitle">login</h1>
        <section className="imputLoginSection">
          <label htmlFor="loginUserName">
            Name:
            <input
              data-testid="login-name-input"
              type="text"
              name="loginUserName"
              value={ loginName }
              onChange={ this.handleChange }
            />
          </label>

          <div>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ loginButtonCheck }
              onClick={ () => this.saveAndLoad(loginName) }
            >
              Entrar
            </button>
            {loading && <Loading />}
            {redirect && <Redirect to="/search" />}
          </div>
        </section>
      </div>
    );
  }
}

// Login.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default Login;
