import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import CurrentUserContext from '../../context/current-user/current-user.context';
import CartContext from '../../context/cart/cart.context';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => {
  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => setHidden(!hidden);

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        <CurrentUserContext.Consumer>
          {currentUser =>
            currentUser ? (
              <div className='option' onClick={() => auth.signOut()}>
                SIGN OUT
              </div>
            ) : (
              <Link className='option' to='/signin'>
                SIGN IN
              </Link>
            )
          }
        </CurrentUserContext.Consumer>
        <CartContext.Provider value={{ hidden, toggleHidden }}>
          <CartIcon />
        </CartContext.Provider>
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
