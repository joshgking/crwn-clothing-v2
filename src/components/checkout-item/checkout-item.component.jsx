import './checkout-item.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, price, name, quantity } = checkoutItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const addProductToCart = () => {
    console.log('DARP', checkoutItem);
    return addItemToCart(checkoutItem);
  };
  const removeProductFromCart = () => {
    console.log('removeItemFromCart', checkoutItem);
    return removeItemFromCart(checkoutItem);
  };

  const deleteItemFromCart = () => {
    console.log('removeItemFromCart', checkoutItem);
    return removeItemFromCart(checkoutItem, true);
  };

  return (
    <div className="">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
      <div className="button-container">
        <Button onClick={addProductToCart}>Add</Button>
        <Button onClick={removeProductFromCart}>Subtract</Button>
        <Button onClick={deleteItemFromCart}>Remove All</Button>
      </div>
    </div>
  );
};

export default CheckoutItem;
