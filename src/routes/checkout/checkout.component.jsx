import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import Button from '../../components/button/button.component';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  console.log('cartItems', cartItems);
  return (
    <div className="checkout-container">
      <div className="cart-items">
        {cartItems && cartItems.length ? (
          cartItems.map((item) => (
            <CheckoutItem key={item.id} checkoutItem={item} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default Checkout;
