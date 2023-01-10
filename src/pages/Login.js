import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordlValid: false,
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Regular Expression Pattern - https://www.w3resource.com/javascript/form/email-validation.php
    if (value.match(mailformat)) {
      this.setState({
        emailValid: true,
      });
    } else {
      this.setState({
        emailValid: false,
      });
    }
  }

  handlePassword({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const mailformat = 6;
    if (value.length >= mailformat) {
      this.setState({
        passwordlValid: true,
      });
    } else {
      this.setState({
        passwordlValid: false,
      });
    }
  }

  render() {
    const { email, password, emailValid, passwordlValid } = this.state;
    const { handleLogin } = this.props;
    return (
      <article>
        <h1 className="mainTitle">TRYBE WALLET</h1>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleEmail }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handlePassword }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              onClick={ () => handleLogin(email) }
              disabled={ !emailValid || !passwordlValid }
            >
              Entrar
            </button>
          </Link>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    handleLogin: (email) => dispatch(addEmail(email)),
  });

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
