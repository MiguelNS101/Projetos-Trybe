import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <span>Projeto StarWars Planets Search</span>
        <div className="footer">
          <span>/</span>
          <a href="https://github.com/MiguelNS101">
            <p>Miguel Santana</p>
          </a>
          <span>/</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
