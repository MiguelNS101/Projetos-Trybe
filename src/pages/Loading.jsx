import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    return (
      <div>
        <span>Carregando...</span>
      </div>
    );
  }
}

// Loading.propTypes = {
//   cardRare: PropTypes.string.isRequired,
//   cardTrunfo: PropTypes.bool.isRequired,
// };

export default Loading;
