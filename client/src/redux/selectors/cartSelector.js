import { createSelector } from 'reselect';

const getCart = (state) =>
  state.cart.products.map(
    ({ prod: { _id, name, price, category, image }, itemQuantity }, index) => {
      const newObj = {
        id: _id,
        index: index + 1,
        name,
        price,
        image,
        category,
        itemQuantity,
        total: itemQuantity * 1 * price * 1,
      };
      return newObj;
    }
  );

const totalItems = (cart) =>
  cart.reduce((acc, item) => item.itemQuantity * 1 + acc, 0);

const toatalPrice = (cart) =>
  cart.reduce((acc, item) => acc + item.price * item.itemQuantity * 1, 0);

const selectCart = createSelector([(state) => getCart(state)], (cart) => ({
  cart,
  totalItems: totalItems(cart),
  totalPrice: toatalPrice(cart),
}));

export default selectCart;
