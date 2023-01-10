import React from 'react';
import propTypes from 'prop-types';

class Comentary extends React.Component {
  constructor() {
    super();
    this.state = {
      comentList: [],
    };
    this.loadComments = this.loadComments.bind(this);
  }

  componentDidMount() {
    // setTimeout pra esperar os props carregarem
    const time = 1000;
    setTimeout(this.loadComments, time);
  }

  loadComments() {
    const { id } = this.props;
    const coments = JSON.parse(localStorage.getItem(id));
    this.setState({
      comentList: coments,
    });
  }

  render() {
    const { comentList } = this.state;
    return (
      <div className="comentSectionCard">
        {comentList !== null ? comentList.map((product, i) => (
          <div key={ i } className="comentCard">
            <p className="comentName">{ product.email }</p>
            <p className="comentDesc">{ product.description }</p>
            <p className="comentRating">{ `${product.star}/5` }</p>
          </div>))
          : <p>Produto nao avaliado</p>}
      </div>
    );
  }
}

Comentary.propTypes = {
  id: propTypes.string,
}.isRequired;
export default Comentary;
