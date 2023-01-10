import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <span>Projeto Trybe Trivia</span>
        <div className="footerNames">
          <span>/</span>
          <a href="https://github.com/MiguelNS101">
            <p>Miguel Santana</p>
          </a>
          <span>/</span>
          <a href="https://github.com/juliaandradesoares">
            <p>Júlia Andrade</p>
          </a>
          <span>/</span>
          <a href="https://github.com/Adolligit">
            <p>Adelson Oliveira</p>
          </a>
          <span>/</span>
          <a href="https://github.com/nayara-vasconcelos">
            <p>Nayara Vasconcelos</p>
          </a>
          <span>/</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
