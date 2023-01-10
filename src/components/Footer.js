import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <div className="iconsLinks">
        <Link to="/drinks">
          <img src={ drinkIcon } alt="drink Icon" data-testid="drinks-bottom-btn" />
        </Link>

        <Link to="/explore">
          <img src={ exploreIcon } alt="explore Icon" data-testid="explore-bottom-btn" />
        </Link>

        <Link to="/foods">
          <img src={ mealIcon } alt="meal Icon" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
