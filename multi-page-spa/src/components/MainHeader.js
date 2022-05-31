import { NavLink } from "react-router-dom";

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">Welcome</NavLink>
          </li>

          <li>
            <NavLink activeClassName={classes.active} to="/products">Products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/:productId => Product Detail Page
