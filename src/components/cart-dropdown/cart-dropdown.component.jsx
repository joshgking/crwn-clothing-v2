import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => navigate('/checkout');
  console.log('cartItemsA', cartItems);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems && cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
