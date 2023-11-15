import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  console.log('addCartItems', cartItems, productToAdd);
  const itemFound = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  //My version:
  // if (itemFound) {
  //   itemFound.quantity++;
  // } else {
  //   productToAdd.quantity = 1;
  //   cartItems.push(productToAdd);
  // }

  // console.log('addCartItems22', cartItems);
  // return [...cartItems];

  //Course Version:

  if (itemFound) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove, removeAll) => {
  console.log('removeCartItem', cartItems, productToRemove);
  const itemFound = cartItems.find((cartItem) => {
    return cartItem.id === productToRemove.id;
  });
  console.log('itemFound', itemFound);
  const updatedCartItems = [...cartItems];
  if (itemFound) {
    return updatedCartItems.map((cartItem, index) => {
      if (cartItem.id === productToRemove.id) {
        if (productToRemove.quantity > 1 && !removeAll) {
          productToRemove.quantity--;
        } else {
          updatedCartItems.splice(index, 1);
        }
      }
      console.log('updatedCartItems', updatedCartItems);
      return updatedCartItems;
    });
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartItemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartItemCount(count);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemFromCart = (productToRemove, removeAll) => {
    const removedCartItem = removeCartItem(
      cartItems,
      productToRemove,
      removeAll
    );
    console.log();
    return setCartItems(removedCartItem);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
