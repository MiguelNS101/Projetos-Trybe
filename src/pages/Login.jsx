import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser, getTokenApi } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  async handlePlay(data) {
    const { handleLogin, getToken, history } = this.props;
    handleLogin(data);
    await getToken();

    history.push('/gamePage');
  }

  render() {
    const { email, name } = this.state;
    const user = {
      name,
      assertions: 0,
      score: 0,
      email,
    };

    return (
      <article className="loginCard">
        <h1>TRYBE TRIVIA</h1>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        {/* <Link to="/GamePage"> */}
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => this.handlePlay(user) }
          disabled={ !name.length > 0 || !email.length > 0 }
        >
          Play
        </button>
        {/* </Link> */}
        <Link to="/Settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </article>
    );
  }
}

// const mapStateToProps = (state) => ({
//   token: state.token,
// });

const mapDispatchToProps = (dispatch) => (
  {
    getToken: (data) => dispatch(getTokenApi(data)),
    handleLogin: (data) => dispatch(addUser(data)),
  });

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  // token: PropTypes.string.isRequired,
};
